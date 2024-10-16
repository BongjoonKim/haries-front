import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "./WritingStyle";
import React, {
  createElement,
  Dispatch, ForwardedRef, forwardRef, ForwardRefRenderFunction,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  Suspense,
  SyntheticEvent,
  useState
} from "react";
import Button from "../../elements/Button";
import Editor from "../../widgets/Editor";
import TextInput from "../../elements/TextInput";
// import TreeView from "@mui/lab/TreeView";
import {TreeView} from "@mui/x-tree-view/TreeView";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import useSidebar from "../../../containers/global/Sidebar/useSidebar";
import SubFolder from "../../../containers/global/Sidebar/SubFolder";
import TagInput from "../../elements/TextInput/TagInput";
import {FormControlLabel, Switch} from "@mui/material";
import TitleInput from "../../elements/TextInput/TitleInput";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CustomButton from "../../elements/Button";

interface WritingContentsLayoutProps {
  children : ReactNode;
  title ?: string | number | readonly string[] | undefined;
  write ?: any;
  save : () => void;
  tags: string[];
  tagInput : string;
  setTagInput : any;
  getDocumentData ?: (id : string) => void;
  addFiles : (event : any) => void;
  handleOutPage: any;
  selectedFolderId : string;
  setSelectedFolderId : any;
  titleWrite ?: (event: any) => void;
  attachments ?: [];
  handleDeleteFile: (el : any) => void;
}

function WritingContentsLayout(props: WritingContentsLayoutProps, ref : any) {
  const {rootId, mainFolders, expanded } = useSidebar({
    isCollapsed : false,
    setFolderId : props.setSelectedFolderId,
    folderId: props.selectedFolderId
  });
  
  console.log("props.attachments", props.attachments!.length)
  return (
    <StyledEditor>
      <div className="title">
        <TitleInput
          ref={ref}
          placeholder="제목을 입력하세요"
          value={props.write.title}
        />
      </div>
      <div className="wrapper-react-toast-area">
        <div className="react-toast-area">
          {props.children}
        </div>
      </div>
      <div className="editor-config">
        <div className="editor-config-left">
          <p className="editor-config-left-items-title">폴더 선택</p>
          <TreeView
            aria-label="customized"
            defaultExpanded={["0"]}
            defaultExpandIcon={<AddBoxOutlinedIcon />}
            onNodeSelect={(event : SyntheticEvent, value : string) => {
              props.setSelectedFolderId(value)
            }}
            selected={props.selectedFolderId}
            defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
          >
            {mainFolders?.map((el, inx) => {
              return (
                <TreeItem
                  key={inx}
                  nodeId={el.id!}
                  label={el.label}
                >
                  {el.childrenId && el.childrenId.length > 0 && createElement(
                    SubFolder,
                    {
                      parentId : el.id!,
                      expanded : expanded!
                    }
                  )}
                </TreeItem>
              )
            })}
          </TreeView>
        </div>
        <div className="editor-config-right">
          <div className="editor-config-right-items">
            <p className="editor-config-right-items-title">첨부파일</p>
            <div className="box">
              <input
                className="editor-config-right-items-contents"
                type="file"
                id="fileUpload"
                onChange={props.addFiles}
                // value={props.attachments!.length && props.attachments}
                multiple={true}
              />
              <div
                className="attachment-list"
              >
                {props.attachments!.length ? props.attachments!.map((el : any) => {
                  return (
                    <div className="attachment-item">
                      {el.Key?.split("/")[2]}
                      <HighlightOffOutlinedIcon
                        onClick={async () => {await props.handleDeleteFile(el)}}
                      />
                    </div>
                  )
                }) : (
                  <>
                  </>
                )}

              </div>
              
            </div>
          </div>
          <div className="editor-config-right-items">
            <p className="editor-config-right-items-title">공개 여부</p>
            <FormControlLabel
              className="editor-config-right-items-contents"
              control={
                <Switch name="disclose" />
              }
              label={"disclose"}
            />
            
          </div>
          <div className="editor-config-right-items">
            <p className="editor-config-right-items-title">태그</p>
            <TagInput
              className="editor-config-right-items-contents"
              tags={props.tags}
              value={props.tagInput}
            />
          </div>
        </div>
      </div>
      <StyledEditorButton>
        <StyledLeftEditorButton>
          <Button variant="contained" color="secondary" children="나가기" onClick={props.handleOutPage}/>
        </StyledLeftEditorButton>
        <StyledRightEditorButton>
          {/*<Button variant="contained" color="primary" children="미리보기" />*/}
          {/*<Button variant="contained" color="primary" children="임시저장"  />*/}
          <Button variant="contained" color="secondary" children="발행" onClick={props.save}/>
        </StyledRightEditorButton>
      </StyledEditorButton>
    </StyledEditor>
  )
}

export default forwardRef(WritingContentsLayout);