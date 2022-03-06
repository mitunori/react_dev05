## 05 回目 画像登録

firebase 認証
編集
削除
ができるようになる☺😁

## 注意点

.env ファイルは必ず自分で作成する！
授業のコードでは各自のものを使用する 🤗
※github にはアップロードしない！！


## ポイント

```
react-router-dom の現在の最新v6ではhistoryを使う際は下記を活用するので注意！
import { useNavigate } from "react-router-dom";


例)
Feed.js

  // 追加4.
  useEffect(() => {
    // Firebase ver9 compliant
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報をチェック！");
      //userにはログインor登録されているかの状態がtrue/falseで入ってくるので、!userはfalse＝user情報がないとき!
      // !user && props.history.push("login"); //こちらはv5.1
      !user && navigate("/login"); //これがv6
    });

    return () => unSub();
  }, [navigate]);



```
