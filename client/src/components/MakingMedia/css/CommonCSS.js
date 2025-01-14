/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const breakpoints = [1200, 576];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const MakingHeader = styled.div`
  img {
    min-height: 150px;
  }
`;

const MakingDiv = styled.div`
  width: 1160px;
  height: auto;
  margin: 0 auto;
  padding-bottom: 50px;
  ${mq[1]} {
    width: 90%;
  }
`;

const MenuList = styled.div`
  width: 1160px;
  margin: 68px auto 0 auto;
  border-bottom: 1px solid #acb0b4;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: center;
  ul {
    height: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 18px !important;
    margin-top: 18px;
    list-style: none;
  }
  .search {
    background: #f7f7f7;
    padding: 5px;
    height: 100%;
    margin-bottom: 0.5rem;
    input {
      background: none;
      border: none;
      text-align: right;
      height: 100%;
      &::placeholder {
        color: #bfbfbf;
      }
    }
    input:focus {
      border: none;
      outline: none;
    }
    svg {
      margin-left: 5px;
      height: 100%;
      cursor: pointer;
    }
  }

  ${mq[1]} {
    width: 100%;
    padding: 0px 5%;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: flex-end;
    ul {
      width: 100%;
      align-content: center;
      justify-content: space-evenly;
      padding-bottom: 0px !important;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .search {
      padding: 3px;
      width: 150px;
      input {
        width: 120px;
        &::placeholder {
          font-size: 10px;
        }
      }
    }
  }
`;

const MenuItem = styled.li`
  background: #ffffff;
  cursor: pointer;
  text-align: center;
  margin-right: 40px;
  padding-bottom: 36px !important;
  height: 1rem;
  &.active {
    padding-bottom: 33px !important;
    border-bottom: 3px solid #61057d;
    p {
      color: #61057d;
    }
  }
  p {
    font-weight: bold;
    user-select: none;
  }

  ${mq[1]} {
    margin-right: 0px;
    padding-bottom: 0rem !important;
    &.active {
      padding-bottom: 0rem !important;
    }
    p {
      font-size: 10px;
    }
  }
`;

const SubGNBDiv = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  ul {
    width: 1160px;
    margin: 0 auto;
    height: 18px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    list-style: none;
    li {
      margin-right: 24px;
      font-size: 16px;
      color: rgba(172, 176, 180, 1);
      user-select: none;
      cursor: pointer;
      &.active {
        color: rgba(97, 5, 125, 1);
        font-weight: bold;
      }
    }
  }
  ${mq[1]} {
    width: 100%;
    padding: 0rem 5% 0rem 5%;
    ul {
      width: 100%;
      flex-wrap: wrap;
      flex-direction: row;
      height: auto;
      li {
        font-size: 10px;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const TopArea = styled.div`
  width: 1160px;
  text-align: right;
  margin: 14px auto;
  display: flex;
  justify-content: space-between;
  ${mq[0]} {
    width: 80%;
  }
  ${mq[1]} {
    width: 90%;
  }
  .upload {
    button {
      width: 95px;
      height: 32px;
      background: #5a278b;
      border: 1px solid #5a278b;
      box-sizing: border-box;
      border-radius: 5px;
      color: white;
      font-weight: bold;
    }
  }
  #sort {
    display: inline-block;
    button {
      width: 95px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      color: black;
      border-radius: 5px;
      border: 1px solid #acb0b4;
      font-weight: bold;
      font-size: 12px;
      line-height: 32px;
      padding: 0;
      &:foucs {
        outline: none;
        box-shadow: none;
      }
      &.btn-primary:focus {
        outline: none;
        box-shadow: none;
      }
      &:after {
        margin-left: 1rem;
        content: "⌵";
        border: none;
        font-weight: bold;
      }
    }
    #dropdown-menu {
      background-color: #fff;
      border: 1px solid #acb0b4;
      max-width: 95px;
      min-width: 95px;
      .dropdown-item {
        color: #bfbfbf;
        font-weight: bold;
        font-size: 12px;

        &:hover {
          background: none;
        }
      }
      .active {
        color: #5a278b;
        background: none;
      }
    }
  }
`;

const StickyBarDiv = styled.div`
  position: sticky;
  top: 100px;
  left: 0px;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  user-select: none;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(178, 3, 108, 0.03),
    0px 9px 30px rgba(163, 1, 79, 0.05);
  .subCategory {
    margin-top: 10px;
    p {
      height: auto;
      cursor: pointer;
      font-size: 15px;
      line-height: 15px;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
      font-weight: bold;
      &:first-of-type {
        margin-left: 0.5rem;
      }
    }
    p.active {
      color: #5a278b;
    }
  }
`;

const LinkCSS = css`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: black;
  }
`;

export {
  MakingHeader,
  MakingDiv,
  MenuList,
  MenuItem,
  SubGNBDiv,
  TopArea,
  StickyBarDiv,
  LinkCSS,
};
