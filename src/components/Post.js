import React from "react";
import ImgData from "../img/aa.png";

const Post = ({ text, image, timestamp }) => {
  // text, image, timestamp はfirebaseからデータを頂戴！と言って取得した
  // ものをこのPotst.jsにデータを渡して→表示する　という仕組み🤗
  return (
    <div>
      {/* 記述1. テキスト(text)情報を受け取る */}
      <div>{text}</div>

      {/* 記述2. 画像(image)情報を受け取る */}
      {image && (
        <div>
          <img src={image} />
        </div>
      )}
      {!image && <img src={ImgData} />}

      {/* 記述3. 日付(timestamp)情報を受け取る */}
      {/* 注意！firebaseのtimestampはjsの形式に変換する必要があるのでnew Dateを使用している */}
      <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>
    </div>
  );
};

export default Post;
