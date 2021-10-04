import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Avatar from "react-avatar";
import { LinkCSS, RequestPostCard } from "../../css/RequestVideoCSS";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

function RequestPostList(props) {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    let body = {
      category: props.SubCategory,
      sort: props.Sort,
      skip: props.Skip,
    };

    axios.post("/api/making/requestVideo", body).then((response) => {
      if (response.data.success) {
        let temp = [...response.data.post];
        setPostList(temp);
      } else {
        console.log("get requestVideo Error", response.data.err);
      }
    });
  }, [props.SubCategory, props.Sort, props.Skip]);

  return (
    <div>
      {PostList.map((post, idx) => {
        return (
          <Link to={"/making/requestPost/" + post.url} key={idx} css={LinkCSS}>
            <RequestPostCard key={idx}>
              <div className="profile">
                <Avatar
                  src={post.auther.photoURL}
                  size="40"
                  round={true}
                  style={{ border: "1px solid #c6c6c6" }}
                />
              </div>
              <div className="author">
                <span>{post.auther.displayName}</span>
              </div>
              <div className="date">
                <span>{post.realTime}</span>
              </div>

              <div className="title">{post.oneLineIntroduce}</div>
              <div className="tag type">
                {post.workTypeArr.length > 0 && (
                  <>
                    <p>작업 유형</p>
                    {post.workTypeArr.map((work, idx) => {
                      return (
                        <span key={idx} className="tag">
                          {work}
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
              <div className="tag purpose">
                {post.videoPurposeArr.length > 0 && (
                  <>
                    <p>영상 목적</p>
                    {post.videoPurposeArr.map((purpose, idx) => {
                      return (
                        <span key={idx} className="tag">
                          {purpose}
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
            </RequestPostCard>
          </Link>
        );
      })}
    </div>
  );
}

export default RequestPostList;