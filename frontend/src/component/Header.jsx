import React, { useContext } from "react";
import { Button } from "@mui/material"
import {signOut} from "../api/auth"
import { Link, useHistory } from "react-router-dom";
import { AuthContext, SubsControl } from "../App";
 
export default function Header(props) {
  const {isSignedIn, setIsSignedIn, setFlash} = useContext(AuthContext)
  const {setSubs, setUser} = useContext(SubsControl)
  const history = useHistory()

  function greeting() {
    const now = new Date().getHours()
    if (now >= 6 && now < 12) {
      return "おはようございます"
    } else if (now >= 12 && now < 18) {
      return "こんにちは"
    } else {
      return "こんばんは"
    }
  }

  function handleSignOut() {
    const is_ok = window.confirm("ログアウトしてよろしいですか。") 
      
    if (is_ok) {
      setFlash("ログアウトしました。")
      setIsSignedIn(false)
      setSubs([])
      setUser("")
      signOut()
      history.push("/signin")
    }
  }

  return (
    <header>
      <div className="header-left">
        <h2 onClick={() => history.push("/")}>SubscManager</h2>
      </div>

      <div className="header-right">
        {isSignedIn && 
          <div className="greeting">
            <p>{greeting()}, {props.user}さん</p>
          </div>
        }

        <div className="nav-items">
          {isSignedIn ?
            <>
              <Button
                component={Link}
                to="/setting"
                size="small"
              >
                ユーザー設定
              </Button>

              <Button
                onClick={handleSignOut}
                size="small"
              >
                ログアウト
              </Button>
            </> 
          :

          <>
            <Button
              size="small"
              component={Link}
              to="/signin"
            >
              ログイン
            </Button>
            
            <Button
              size="small"
              component={Link}
              to="/signup"
            >
              新規登録
            </Button>
          </>
          }
          
        </div>
      </div>
    </header>
  )
}