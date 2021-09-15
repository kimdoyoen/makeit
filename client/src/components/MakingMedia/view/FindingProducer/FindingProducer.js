import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProducerList from "./ProducerList.js";
import StickyBar from "./StickyBar.js";
import Dropdown from "react-bootstrap/Dropdown";
import { ProducerListDiv } from "../../css/FindingProducerCSS.js";
import { ReactComponent as PenIcon } from "../../css/Img/Pen.svg";

import axios from 'axios';

function FindingProducer(props) {
  const [SubCategory, setSubCategory] = useState("전체");
  const [Sort, setSort] = useState("인기순");
  const [Skip, setSkip] = useState(0);
  const [PageLen, setPageLen] = useState(1);
  const [PageIdxArr, setPageIdxArr] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([
    "전체",
    "일반 영상",
    "유튜브 제작",
    "특수영상",
    "광고/홍보 영상",
    "온라인 생중계",
    "애니메이션",
    "촬영",
    "편집/자막",
    "기타",
  ]);

  const getPageLen = () => {
    let body = {
      category: SubCategory,
    }

    axios.post("/api/making/producer/postLength", body).then((response) => {
      if(response.data.success) {
        setPageLen(parseInt((response.data.len - 1) / 12) + 1);
      }
    })
  }

  useEffect(() => {
    console.log("getPageLen");
    getPageLen();
  }, [SubCategory]);

  useEffect(() => {
    let temp=[];
    for (let i = 1; i<=10; i++) {
      temp.push(parseInt(Skip / 120) * 10 + i);
      if(parseInt(Skip / 120) * 10 + i === PageLen)
        break;
    }
    setPageIdxArr(temp);
  }, [parseInt(Skip/120)]);

  useEffect(() => {
    console.log("PageIdxArr", PageIdxArr, "pageLen", PageLen);
  }, [PageIdxArr])

  return (
    <ProducerListDiv>
      <div className="left">
        <StickyBar
          Menu={props.Menu}
          SubCategory={SubCategory}
          setSubCategory={setSubCategory}
          SubCategoryList={SubCategoryList}
        />
      </div>
      <div className="right">
        <div className="GNB">
          <p className="category">홈 &gt; {SubCategory}</p>
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

        <ProducerList SubCategory={SubCategory} Sort={Sort} Skip={Skip} user={props.user}/>

        <Link to="/Making/ProducerUpload">
          <button className="postBtn">
            게시하기
            <PenIcon />
          </button>
        </Link>
        <div className="FNB">
          <div className="pagination">
          {
            PageIdxArr[0] !== 1 ?
            <button onClick={() => setSkip((parseInt(Skip/120)-1)*120)}>&lt; 이전</button>
            : null
          }
          <ul>
            {
              PageIdxArr.map((page, idx) => {
                return (
                <li key={idx} onClick={() => setSkip(parseInt(Skip/120)*120 + 12 * idx)} className={(Skip/12) + 1 === page ? "active" : null}>{page}</li>
                )
              })
            }
          </ul>
          {
            ( PageIdxArr[PageIdxArr.length-1] < PageLen ) &&
            <button onClick={() => setSkip((parseInt(Skip/120) + 1)*120)}>다음 &gt;</button>
          }
          </div>
        </div>
      </div>
    </ProducerListDiv>
  );
}

export default FindingProducer;
