import styled from "styled-components";

export const StyledEditor = styled.div`
  //display: block;
  justify-content: center;
  align-items: center;
  height: 40rem;
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
      .editor-config-right-items {
        display: flex;
        line-height: 3rem;
        height: 3rem;
        .editor-config-right-items-title {
          background-color: rgb(230 230 230);
          width: 5rem;
          margin: 0;
          line-height: 3rem;
          height: 100%;
        }
        .editor-config-right-items-contents {
          line-height: 3rem;
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