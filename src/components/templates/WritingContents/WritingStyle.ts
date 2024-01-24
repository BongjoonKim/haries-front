import styled from "styled-components";

export const StyledEditor = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  .wrapper-react-toast-area {
    display: flex;
    flex: 1;
    .react-toast-area {
      display: flex;
      flex: 1;
      & > div {
        height: 100% !important;
        width: 100%;
      }
    }
  }

  .editor-config {
    width: 100%;
    display: flex;
    height: 12rem;
    .editor-config-left {
      height: inherit;
      display: flex;
      width : 20rem;
      margin: 0;
      .editor-config-left-items-title {
        background-color: rgb(230 230 230);
        margin: 0;
      }
    }
    .editor-config-right {
      display: table;
      height: inherit;
      .editor-config-right-items-attachment {
        display: flex;
        flex-direction: column;
      }
      .editor-config-right-items {
        display: flex;
        line-height: 3rem;
        //height: 3rem;
        .editor-config-right-items-title {
          background-color: rgb(230 230 230);
          width: 5rem;
          margin: 0;
          line-height: 3rem;
        }
        .editor-config-right-items-contents {
          line-height: 3rem;
        }
        .attachment-list {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;

export const StyledEditorButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLeftEditorButton = styled.div`
  display: flex;
  bottom: 0;
  margin-right: auto;
  align-items: center;
`;

export const StyledRightEditorButton = styled.div`
  display: flex;
  bottom: 0;
  margin-left: auto;
  align-items: center;
`;