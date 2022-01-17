import styled from "@emotion/styled";

const breakpoints = [1200, 576];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const BtnDiv = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: flex-end;

  button {
    background: #5a278b;
    border: 1px solid #5a278b;
    border-radius: 3px;
    padding: 5px 10px;

    font-weight: bold;
    color: white;
    &:hover,
    &:focus {
      background: white;
      color: #5a278b;
    }
  }
`;

const ProjectDetailContentDiv = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #c6c6c6;

  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 20px 30px;

  section {
    margin-bottom: 2rem;
    label {
      margin-bottom: 1rem;
    }
    &:nth-last-of-type(1) {
      margin-bottom: 0px;
    }
    &.title {
      width: 100%;
      padding: 10px 20px;
      h3 {
        font-weight: bold;
        text-align: center;
        border: 1px solid #acb0b4;
        width: 100%;
        background-color: white;
      }
    }

    &.info {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "img introduce"
        "img detailContent"
        "img location";
      grid-gap: 1rem;
      .img {
        grid-area: img;
        img {
          border-radius: 5px;
          width: 100%;
          height: auto;
          max-height: 200px;
          border: 1px solid #c6c6c6;
        }
      }

      .infoDiv {
        width: 100%;
        display: flex;
        align-content: center;
        align-items: flex-start;
        label {
          width: 15%;
          height: 100%;
          margin-bottom: 0px;
          user-select: none;
          margin-bottom: 0px;
        }
        div {
          width: 100%;
          height: 100%;
          padding: 5px 10px;
          border: 1px solid #acb0b4;
          border-radius: 3px;
          p {
            margin-bottom: 0px;
          }
        }
      }

      .introduce {
        grid-area: introduce;
        label {
          display: flex;
          align-items: center;
        }
        div {
          display: flex;
          align-items: center;
        }
      }
      .detailContent {
        grid-area: detailContent;
      }
      .location {
        grid-area: location;
        label {
          display: flex;
          align-items: flex-start;
        }
        span {
          width: 100%;
          div {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            justify-content: center;
          }
        }
      }
    }

    &.timeline {
      div {
        width: 100%;
        border: 1px solid #acb0b4;
        background-color: white;
        padding: 5px 10px;
        margin-bottom: 1rem;
        cursor: pointer;
        p {
          margin-bottom: 0px;
          span {
            font-weight: bold;
          }
        }
      }
    }

    &.participants {
      button {
        width: 100%;
        border: 1px solid #acb0b4;
        padding: 20px;
        min-height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;

        cursor: pointer;
        font-weight: bold;
        &:hover,
        &:focus {
          border: 1px solid black;
        }
      }
    }

    &.tag {
      .list {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        p {
          margin-right: 1rem;
          border-radius: 15px;
          border: 1px solid #acb0b4;
          padding: 5px 10px;
          text-align: center;
          margin-bottom: 1rem;
          line-height: 16px;
          min-width: 150px;
        }
      }
    }
  }
`;

const ParticipateModalDiv = styled.div``;

export { BtnDiv, ProjectDetailContentDiv, ParticipateModalDiv };