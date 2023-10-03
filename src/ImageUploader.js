import { Button } from "@mui/material";
import React from "react";
import ImageLogo from "./image.svg";
import "./ImageUpload.css";
import storage from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useRef } from "react";

const ImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  // 進捗ステータス
  const [isProgressStatus, setProgressStatus] = useState(0);
  // 停止ボタン
  const [isCanceled, setIsCanceled] = useState(false);
  // 共有リンク
  const [shredUrl, setSharedUrl] = useState(null);

  const uploadImageRef = useRef(null);

  const OnFileUploadToFirebase = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);
    setIsCanceled(false); // 停止ステータス初期化

    // Upload the file and metadata
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImageRef.current = uploadImage; // タスクを ref に保存

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        // 進捗度を定義
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressStatus(progress);
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setUploaded(true);
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setSharedUrl(downloadURL);
        });
      }
    );
  };

  // 停止ボタン押下時
  function cancelUpload() {
    setIsCanceled(true);
    if (uploadImageRef.current) {
      console.log("停止ボタン押下！");
      uploadImageRef.current.cancel();
      setLoading(false);
    }
  }

  function initialScreen() {
    setLoading(false);
    setUploaded(false);
  }

  return (
    <>
      {loading ? (
        <div className="outerBox">
          <h2>アップロード中・・・</h2>
          <progress value={isProgressStatus} max="100"></progress>
          <Button
            variant="contained"
            onClick={cancelUpload}
            style={{ marginTop: "20px" }}
          >
            停止
          </Button>
        </div>
      ) : (
        <>
          {isUploaded ? (
            <div className="outerBox">
              <h2>アップロード完了🚀 </h2>
              <a href={shredUrl} target="_blank" rel="noreferrer">
                共有リンク
              </a>
              <Button
                variant="contained"
                onClick={initialScreen}
                style={{ marginTop: "20px" }}
              >
                戻る
              </Button>
            </div>
          ) : (
            <div className="outerBox">
              <div className="title">
                {isCanceled ? <p>アップロードがキャンセルされました。</p> : ""}
                <h2>画像アップローダー</h2>
                <p>JpegかPngの画像ファイル</p>
              </div>
              <div className="imageUplodeBox">
                <div className="imageLogoAndText">
                  <img src={ImageLogo} alt="imagelogo" />
                  <p>ここにドラッグ＆ドロップしてね</p>
                </div>
                <input
                  className="imageUploadInput"
                  multiple
                  name="imageURL"
                  type="file"
                  accept=".pmg, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                />
              </div>
              <p>または</p>
              <Button variant="contained">
                ファイルを選択
                <input
                  className="imageUploadInput"
                  type="file"
                  accept=".pmg, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                />
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageUploader;
