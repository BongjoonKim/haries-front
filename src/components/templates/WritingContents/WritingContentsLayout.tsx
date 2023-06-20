import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "./WritingStyle";
import React, {createElement, MutableRefObject, ReactNode, Suspense, useState} from "react";
import Button from "../../elements/Button";
import Editor from "../../widgets/Editor";
import TextInput from "../../elements/TextInput";
import useWritingContents from "./useWritingContents";
import TreeView from "@mui/lab/TreeView";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import useSidebar from "../../../containers/global/Sidebar/useSidebar";
import SubFolder from "../../../containers/global/Sidebar/SubFolder";
import TreeItem from "@mui/lab/TreeItem";

interface WritingContentsLayoutProps {
  titleRef : MutableRefObject<HTMLTextAreaElement>
  children : ReactNode;
  addFiles : any;
  handleSave : () => void;
  titles ?: string | number | readonly string[] | undefined;
  
}

function WritingContentsLayout(props : WritingContentsLayoutProps) {
  const {handleOutPage} = useWritingContents();
  const {rootId, mainFolders, expanded} = useSidebar();
  
  return (
    <StyledEditor>
      <table className="editor-table">
        <tbody>
        <tr>
          <td colSpan={2}>
            <TextInput
              name="title"
              id="editor-table-title"
              ref={props.titleRef}
              placeholder="제목을 입력하세요"
              defaultValue={props.titles}
            />
          </td>
        </tr>
        <tr>
          <td className="react-toast-area" colSpan={2}>
            {props.children}
          </td>
        </tr>
        <tr className="editor-table-info">
          <th>첨부파일</th>
          <td>
            <input type="file" id="fileUpload" onChange={props.addFiles} />
          </td>
          <th>폴더 선택</th>
          <td>
            <TreeView
              aria-label="customized"
              defaultExpanded={["0"]}
              defaultExpandIcon={<AddBoxOutlinedIcon />}
              defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
            >
              {mainFolders?.map((el, inx) => {
                return (
                  <TreeItem
                    key={inx}
                    nodeId={el.id}
                    label={el.label}
                  >
                    {el.childrenId.length > 0 && createElement(
                      SubFolder,
                      {
                        parentId : el.id,
                        expanded : expanded!
                      }
                    )}
                  </TreeItem>
                )
              })}
            </TreeView>
          </td>
        </tr>
        <tr>
          <th>Tag</th>
        </tr>
        </tbody>
      </table>
      <StyledEditorButton>
        <StyledLeftEditorButton>
          <Button variant="contained" color="secondary" children="나가기" onClick={handleOutPage}/>
        </StyledLeftEditorButton>
        <StyledRightEditorButton>
          <Button variant="contained" color="primary" children="미리보기" />
          <Button variant="contained" color="primary" children="임시저장"  />
          <Button variant="contained" color="secondary" children="발행" onClick={props.handleSave}/>
        </StyledRightEditorButton>
      </StyledEditorButton>
    </StyledEditor>
  )
}

export default WritingContentsLayout;