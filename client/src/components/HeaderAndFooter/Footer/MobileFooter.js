import React, { useState, useEffect } from "react";
import { MobileFooterDiv } from "../css/FooterElement.js";
import { Link } from "react-router-dom";
import {
  FooterMobileBottom1,
  FooterMobileBottom2,
  FooterMobileBottom3,
  FooterMobileBottom4,
  FooterMobileBottom5,
} from "./FooterMobileBottom.js";

function MobileFooter(props) {
  const [Path, setPath] = useState(props.Path);
  useEffect(() => {
    console.log("MobileFooter", Path);
  }, []);

  return (
    <MobileFooterDiv>
      <ul>
        <li className={Path === "home" ? "active" : null}>
          <Link to="/">
            <FooterMobileBottom1 />
          </Link>
        </li>
        <li>
          <Link to="/landingPage">
            <FooterMobileBottom2 />
          </Link>
        </li>
        <li>
          <Link to="/landingPage">
            <FooterMobileBottom3 />
          </Link>
        </li>
        <li>
          <Link to="/landingPage">
            <FooterMobileBottom4 />
          </Link>
        </li>
        <li className={Path === "community" ? "active" : null}>
          <Link to="/community">
            <FooterMobileBottom5 />
          </Link>
        </li>
      </ul>
    </MobileFooterDiv>
  );
}

export default MobileFooter;
