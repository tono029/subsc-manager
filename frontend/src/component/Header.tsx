import { useContext } from "react";
import { Button } from "@mui/material"
import { Link, useHistory } from "react-router-dom";
import { AuthContext, GeneralControl } from "../App";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Header(props: {user: string}) {
  const {isSignedIn} = useContext(AuthContext)
  const {setMainSlide} = useContext(GeneralControl)
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

  function toSetting() {
    history.push("/main")
    setMainSlide({dire: "left", in: false})
  }

  const handleManageClick = () => {
    history.push("/main")
    setMainSlide({dire: "right", in: true, appear: false})
  }

  return (
    <header>
      <div className="header-left">
        <h2 onClick={() => history.push("/")}>
          SubscManager
        </h2>
      </div>

      <div className="header-right">
        <div className="nav-items">
          {isSignedIn ?
            <>
              <div className="greeting">
                <p>{greeting()}, {props.user}さん</p>
              </div>

              <Button
                onClick={handleManageClick}
                size="small"
              >
                管理
              </Button>

              <ManageAccountsIcon
                fontSize="large"
                onClick={toSetting}
              >
              </ManageAccountsIcon>
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