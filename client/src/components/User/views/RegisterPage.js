import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import firebase from "../../../config/firebase.js";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { DivCSS, BoxDivCSS, Logo, FormDivCSS } from "../css/UserPageElement.js";
import MobileFooter from "../../HeaderAndFooter/Footer/MobileFooter.js";
import axios from "axios";
import shortId from "shortid";

function RegisterPage() {
  //회원정보
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  //이메일 인증
  const [Key, setKey] = useState("");
  const [InputKey, setInputKey] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [EmailCheck, setEmailCheck] = useState(true); //이메일 중복 확인용
  const [EmailCheckVerification, setEmailCheckVerification] = useState(false); //이메일 인증 완료 여부

  //회원가입 완료
  const [ErrorFormSubmit, setErrorFormSubmit] = useState("");
  const [Loading, setLoading] = useState(false);

  let history = useHistory();

  const EmailVerification = () => {
    let temp = shortId.generate();
    let body = {
      email: Email,
      key: temp,
      name: Name,
    };
    setKey(temp);
    axios.post("api/user/sendEmail", body).then((response) => {
      if (response.data.success) alert("이메일이 전송되었습니다.");
    });
  };

  const verifyEmail = (email) => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email.match(regExp) != null) return true;
    else return false;
  };

  const StartTimer = async () => {
    if (!(Email && Name)) {
      return alert("이메일과 이름을 모두 입력해주십시오.");
    }
    if (!verifyEmail(Email)) {
      return alert("이메일 주소가 잘못되었습니다.");
    }
    var EmailCheckFunc = new Promise((resolve, reject) => {
      let body = {
        email: Email,
      };
      try {
        axios.post("api/user/checkEmail", body).then((response) => {
          if (!response.data.success) reject(response.data.success);
          if (!response.data.doc) {
            //이매일이 없는 경우
            setEmailCheck(false);
            resolve(false);
          } else {
            //이메일이 있는 경우
            setEmailCheck(true);
            resolve(true);
          }
        });
      } catch (error) {
        reject(error);
      }
    });

    EmailCheckFunc.then((val) => {
      if (val) {
        return alert("이미 가입된 이메일입니다.");
      } else {
        EmailVerification();
        setMinutes(parseInt(3));
        setTimeout(() => {
          setKey("");
        }, 180000);
      }
    }).catch((reason) => {
      console.log(reason);
    });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }
    if (!EmailCheckVerification) {
      return alert("이메일 인증을 완료해 주세요.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    try {
      setLoading(true);
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(body.email, body.password);

      await createdUser.user.updateProfile({
        displayName: body.name,
        photoURL: `https://kr.object.ncloudstorage.com/makeit/user/profile.png`,
      });

      let user = {
        uid: createdUser.user.uid,
        displayName: createdUser.user.displayName,
        email: body.email,
        photoURL: createdUser.user.photoURL,
      };

      await axios.post("/api/user/register", user).then((response) => {
        if (response.data.success) {
          console.log("success");
        } else {
          console.log("false");
        }
      });

      //Firebase 데이터베이스에 저장해주기
      await firebase.database().ref("users").child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      setLoading(false);
      //회원가입 완료 페이지 만들고 push
      history.push({
        pathname: "/register/complete",
        state: { flag: true },
      });
    } catch (error) {
      console.log(error);
      setErrorFormSubmit(error.message);

      setTimeout(() => {
        setErrorFormSubmit("");
        setLoading(false);
      }, 5000);
    }
  };

  return (
    <>
      <div css={DivCSS}>
        <div css={BoxDivCSS}>
          <div css={Logo}>
            <img src={process.env.PUBLIC_URL + "/Img/logo.png"} alt="" />
            <p>
              영상의 시작,
              <br />
              영상이 쉬워지는 곳
            </p>
          </div>
          <form css={FormDivCSS} onSubmit={onSubmitHandler}>
            <label>이름</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />

            <label>이메일</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              disabled={EmailCheckVerification ? true : false}
            />
            {!EmailCheckVerification && (
              <button
                type="button"
                onClick={() => StartTimer()}
                disabled={Key ? true : false}
              >
                이메일 인증
              </button>
            )}

            {Key && !EmailCheckVerification ? (
              <>
                <div style={{ textAlign: "left", width: "100%" }}>
                  <p>
                    인증번호
                    <span style={{ color: "red", marginLeft: "1rem" }}>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  </p>
                  <br />
                  <input
                    type="verification"
                    value={InputKey}
                    onChange={(e) => setInputKey(e.currentTarget.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (Key === InputKey) {
                        setEmailCheckVerification(true);
                        alert("이메일 인증이 완료되었습니다.");
                      }
                    }}
                  >
                    인증 완료
                  </button>
                </div>
              </>
            ) : null}

            <label>비밀번호</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />

            <label>비밀번호확인</label>
            <input
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              required
            />

            <br />
            {ErrorFormSubmit && <p>{ErrorFormSubmit}</p>}
            <button type="submit" disabled={Loading}>
              회원 가입
            </button>
          </form>
        </div>
      </div>
      <MobileFooter />
    </>
  );
}

export default withRouter(RegisterPage);
