/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const breakpoints = [1200, 576];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const GNBDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 5vh;
  padding-bottom: 5vh;
  ${mq[1]} {
    width: 90%;
  }
`;

const GNBBtnDiv = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: space-evenly;
  ${mq[1]} {
    display: none;
  }
`;

const GNBMobileDiv = styled.div`
  display: none;
  ${mq[1]} {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;
  }
`;

const GNBMobileContentDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const GNBCategoryBtn = styled.button`
  padding: 5px 10px 5px 10px;
  background: #ffffff;
  color: #702c8a;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 22px;
  font-size: 14px;
  ${mq[0]} {
    padding: 5px 10px 5px 10px;
    font-size: 12px;
  }
  ${mq[1]} {
    padding: 2px 5px 2px 5px;
    font-size: 10px;
  }
`;

const PostLabelDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: 100px 120px 1fr 80px;
  grid-template-rows: auto;
  grid-template-areas: "label btn . upload";
  place-items: center;
  ${mq[1]} {
    width: 90%;
  }
`;

const PostListDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  ${mq[1]} {
    width: 90%;
  }
`;

export {
  GNBDiv,
  GNBBtnDiv,
  GNBMobileDiv,
  GNBMobileContentDiv,
  GNBCategoryBtn,
  PostLabelDiv,
  PostListDiv,
};
