import "./App.css";
import { Button } from "@mui/material";
import ImageUploader from "./ImageUploader";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? (
        <div>
          <div className="header">
            <UserInfo />
            <SignOutButton />
          </div>

          {/* アップローダー */}
          <ImageUploader />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export default App;

// Googleでサインインボタン
function SignInButton() {
  const signInWithGoogle = () => {
    // firebaseを使ってGoogleでサインインする
    signInWithPopup(auth, provider);
  };

  return (
    <Button variant="contained" size="large" onClick={signInWithGoogle}>
      Googleでサインイン
    </Button>
  );
}

// サインアウト
function SignOutButton() {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => auth.signOut()}
      color="error"
    >
      サインアウト
    </Button>
  );
}

// ユーザ情報
function UserInfo() {
  return (
    <div className="userInfo">
      <img src={auth.currentUser.photoURL} alt="ユーザアイコン" />
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
}
