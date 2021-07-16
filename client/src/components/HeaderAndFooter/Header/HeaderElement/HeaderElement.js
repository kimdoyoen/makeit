import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import {
  HeaderDiv,
  HeaderGrid,
  HeaderLogo,
  HeaderSearch,
  MobileHambuck,
  MobileSideBackDiv,
  MobileSlideDiv,
} from "../../css/HeaderElement.js";
import MobileSlide from "./MobileSlide.js";
import HeaderNavArea from "./HeaderNavArea.js";
import HeaderLoginArea from "./HeaderLoginArea.js";
import "../../css/header.css";
import "../../css/animation.css";

function HeaderElement(props) {
  //modal
  const [alarmHambucControl, setalarmHambucControl] = useState(false);
  const [myPageHambucControl, setmyPageHambucControl] = useState(false);

  return (
    <>
      <HeaderDiv className={`header ${props.shadowStyle} ${props.hiddenStyle}`}>
        <HeaderGrid>
          <HeaderLogo>
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "/Img/logo.png"}
                alt="MainLogo"
              />
            </Link>
          </HeaderLogo>

          <HeaderNavArea />

          <HeaderSearch>
            <form action="/search" method="GET">
              <input type="text" placeholder="Search..." />
            </form>
          </HeaderSearch>

          <HeaderLoginArea
            alarmHambucControl={alarmHambucControl}
            setalarmHambucControl={setalarmHambucControl}
            myPageHambucControl={myPageHambucControl}
            setmyPageHambucControl={setmyPageHambucControl}
          />

          <MobileHambuck>
            <i className="bi bi-list" onClick={() => props.showSide()}></i>
          </MobileHambuck>
        </HeaderGrid>
      </HeaderDiv>

      <MobileSideBackDiv
        className="MobileSideBack"
        onClick={() => props.hideSide()}
      />
      <MobileSlideDiv className="MobileSideBar">
        <MobileSlide />
      </MobileSlideDiv>
    </>
  );
}

function useOuterClick(callback) {
  const callbackRef = useRef();
  const innerRef = useRef();
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
      //수정버튼 클릭시
      if (e.target.className === "edit") {
        callbackRef.current(!e);
      }
    }
  }, []);
  return innerRef;
}

export default HeaderElement;