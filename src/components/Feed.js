import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 追加1. auth
import { db, auth } from "../firebase";
//Firebase ver9 compliant
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Post from "./Post";
import AddInput from "./AddInput";

// 追加2.
import {onAuthStateChanged, signOut} from 'firebase/auth'

const Feed = () => {
    const navigate = useNavigate();
    console.log(navigate, 'vv');
  // firebaseに作成した項目を受け取るための変数 = useState
  // 記述1. useStateを準備する
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      timestamp: null,
    },
  ]);

  // 記述2.useEffectを使ってデータを取得する
  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  console.log(posts, "useStateの中身"); //データの流れを確認しましょう！

  // 追加4.
  useEffect(() => {
    // Firebase ver9 compliant
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報をチェック！");
      //userにはログインor登録されているかの状態がtrue/falseで入ってくるので、!userはfalse＝user情報がないとき!
      // !user && props.history.push("login");
      !user && navigate("/login");
    });

    return () => unSub();
  }, [navigate]);

  return (
    <div>
      {/* Feed */}

      {/*　記述5. ログアウトの処理 */}
      <button
      onClick={
        async () => {
          try{
            await signOut(auth);
            // props.history.push('login');
            navigate("/login");
          }catch(error){
            alert(error.message)
          }
        }
      }>
        ログアウト
      </button>

      {/* 記述4  AddInputを読み込む*/}
      <AddInput />

      {/* 記述3.Postコンポーネントにデータを流し込む */}
      {/* && は存在するときのみ実行されるという書き方 */}
      {posts &&
        posts.map((item) => (
          <Post
            // ES6(javascript)のmapをReactで使うときは[key]の記述が必須です！
            id={item.id}
            key={item.id}
            image={item.image}
            text={item.text}
            timestamp={item.timestamp}
          />
        ))}
      {/*  */}
    </div>
  );
};

export default Feed;
