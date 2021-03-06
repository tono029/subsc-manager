import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext, GeneralControl } from "../App";
import {Stack, TextField} from "@mui/material"
import { LoadingButton } from '@mui/lab'

export const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const {setUser, handleGetSubs, setFlash} = useContext(GeneralControl)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true)
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        const user_name = res.data.data.uid.split("@")

        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        setUser(user_name[0])
        handleGetSubs()
        setFlash("ログインしました。")
        setIsLoading(false)

        history.push("/main");
      }
    } catch (e) {
      setFlash("ログインに失敗しました。")
      setIsLoading(false)
      console.log("signinError", e);
    }
  };

  const inputPassword = React.useRef(null)

  return (
    <div className="container sign-form">
      <Stack
        alignItems="center"
      >
        <h3>ログイン</h3>

        <form>
          <TextField
            required
            fullWidth
            label="メールアドレス"
            size="small"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            // onKeyDown={e => e.key === "Enter" && inputPassword.current.focus()}
          />

          <TextField
            fullWidth
            required
            label="パスワード"
            size="small"
            type="password"
            id="password"
            name="password"
            inputRef={inputPassword}
            value={password}
            onChange={e => setPassword(e.target.value)}
            // onKeyDown={e => e.key === "Enter" && handleSignInSubmit(e)}
          />

          <LoadingButton
            loading={isLoading}
            fullWidth
            variant="contained"
            onClick={(e) => handleSignInSubmit(e)}
          >
            ログイン
          </LoadingButton>
        </form>

      </Stack>
      
      <div className="sign-form-footer">
        <Link to="/signup">アカウント登録ページへ</Link>
      </div>
    </div>
  );
};