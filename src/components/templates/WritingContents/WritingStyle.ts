import styled from "styled-components";

export const StyledEditor = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  .editor-table {
    margin: auto;
    width: 100%;
  textarea {
    width: 100%;
    border: none;
    display: flex;
  }
  .editor-table-info {
    width: 100%;
  }
}
`;

export const StyledEditorButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledRightEditorButton = styled.div`
  display: flex;
  bottom: 0;
  margin-left: auto;
  align-items: center;
`;

export const StyledLeftEditorButton = styled.div`
  display: flex;
  bottom: 0;
  margin-right: auto;
  align-items: center;
`;