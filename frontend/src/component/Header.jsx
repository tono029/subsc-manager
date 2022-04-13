import React from "react";
import {Button } from "@mui/material"
import {signOut} from "../api/auth"
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

 
export default function Header(props) {
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

  return (
    <header>
      <div className="header-left">
        <h2>SubscManager</h2>
      </div>

      <div className="header-right">
        <div className="greeting">
          <p>{greeting()}, {props.user}さん</p>
        </div>

        <div className="nav-items">
          {props.isSignedIn ?
            <Button
              onClick={signOut}
              component={Link}
              to="/signin"
            >
              ログアウト
            </Button>

          :

          <>
            <Button
              component={Link}
              to="/signin"
            >
              Login
            </Button>
            
            <Button
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