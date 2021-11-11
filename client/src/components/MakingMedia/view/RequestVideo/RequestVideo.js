import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import StickyBar from "../common/StickyBar.js";
import Dropdown from "react-bootstrap/Dropdown";
import RequestPostList from "./RequestPostList.js";
import { RequestListDiv } from "../../css/RVCSS.js";
import { ReactComponent as PenIcon } from "../../css/Img/Pen.svg";
import { ReactComponent as SearchIcon } from "../../css/Img/searchIcon.svg";

import axios from "axios";

function RequestVideo(props) {
  let location = useLocation();

  const [Sort, setSort] = useState("최신순");
  const [Skip, setSkip] = useState(0);
  const [PageLen, setPageLen] = useState(1);
  const [PageIdxArr, setPageIdxArr] = useState([]);
  const [SubCategory, setSubCategory] = useState("전체");
  const [SearchTerm, setSearchTerm] = useState("");


  const getPageLen = () => {
    let body = {
      category: SubCategory,
    };

    axios.post("/api/making/requestVideo/postLength", body).then((response) => {
      if (response.data.success) {
        setPageLen(parseInt((response.data.len - 1) / 6) + 1);
        setSkip(0);
      }
    });
  };

  useEffect(() => {
    getPageLen();
  }, [SubCategory]);

  useEffect(() => {
    let temp = [];
    for (let i = 1; i <= 10; i++) {
      temp.push(parseInt(Skip / 60) * 10 + i);
      if (parseInt(Skip / 60) * 10 + i === PageLen) break;
    }
    setPageIdxArr(temp);
  }, [PageLen, parseInt(Skip / 60)]);
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, [Skip]);

  return (
    <RequestListDiv>
      <div className="left">
        <StickyBar
          Menu={props.Menu}
          SubCategory={SubCategory}
          setSubCategory={setSubCategory}
          SubCategoryList={props.SubCategoryList}
        />
      </div>
      <div className="right">
        <div className="GNB">
          <p className="category">
            홈 &gt; 영상제작 &gt; 의뢰하기 &gt; {SubCategory}
          </p>
          <div className="filter">
            <div className="search">
                <input type="text" placeholder="검색하기" value={SearchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} onKeyDown={(e) => {if(e.keyCode === 13) /*SearchHandler(e)*/{}}}/>
                <SearchIcon onClick={(e) => /*SearchHandler(e)*/{}}/>
            </div>
            <Dropdown id="sort">
              <Dropdown.Toggle id="dropdown-basic">{Sort}</Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-menu">
                <Dropdown.Item onClick={() => setSort("인기순")}>
                  인기순
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("최신순")}>
                  최신순
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <RequestPostList Sort={Sort} Skip={Skip} SubCategory={SubCategory} />
        <div className="postBtn">
          <Link to="/Making/RequestUpload">
            <button>
              게시하기
              <PenIcon />
            </button>
          </Link>
        </div>
        <div className="FNB">
          <div className="pagination">
            {PageIdxArr[0] !== 1 ? (
              <button onClick={() => setSkip((parseInt(Skip / 60) - 1) * 60)}>
                &lt; 이전
              </button>
            ) : null}
            <ul>
              {PageIdxArr.map((page, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() =>
                      setSkip(parseInt(Skip / 60) * 60 + 6 * idx)
                    }
                    className={Skip / 6 + 1 === page ? "active" : null}
                  >
                    <p>{page}</p>
                  </li>
                );
              })}
            </ul>
            {
                PageIdxArr[PageIdxArr.length - 1] < PageLen && (
                  <button onClick={() => setSkip((parseInt(Skip / 60) + 1) * 60)}>
                    다음 &gt;
                  </button>
                )
            }
          </div>
        </div>
      </div>
    </RequestListDiv>
  );
}

export default RequestVideo;
