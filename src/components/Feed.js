import React, { useState, useEffect } from "react";
import { db } from "../firebase";
//Firebase ver9 compliant
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Post from "./Post";
import AddInput from "./AddInput";

const Feed = () => {
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

  return (
    <div>
      {/* Feed */}

      {/* 記述4  AddInputを読み込む*/}
      <AddInput />

      {/* 記述3.Postコンポーネントにデータを流し込む */}
      {/* && は存在するときのみ実行されるという書き方 */}
      {posts &&
        posts.map((item) => (
          <Post
            // ES6(javascript)のmapをReactで使うときは[key]の記述が必須です！
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
