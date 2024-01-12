// 폴더 트리 구조
import {FoldersDTO} from "../../../types/dto/FoldersDTO";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import styled from "styled-components";
import useFolderTree from "./useFolderTree";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CustomButton from "../../elements/Button";
import {Button} from "@mui/material";
import CustomIconButton from "../../elements/Button/CustomIconButton";
import React, {ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useCallback, useState} from "react";
import CustomPopover from "../../elements/CustomPopover";
import EditNamePopover from "../EditNamePopover";
import {deleteFolder, postFolders, putFolders} from "../../../endpoints/folders-endpotins";
import generatorUtil from "../../../utilities/generatorUtil";

export interface IsVisibleProps {
  id : string;
  value : boolean;
}

interface FolderAddEditDeleteProps extends FolderTreeProps{
  label : string;
  id : string;
  parentId ?: string;
  isVisible : IsVisibleProps;
  onPopoverOpener : (event: any, id: string, type : "add" | "edit" | "delete") => void;
  addEditDelete : any;
  anchorEl : any;
  setAnchorEl : Dispatch<SetStateAction<HTMLButtonElement | null>>;
  open : any;
}

interface TreeConstructureProps extends FolderTreeProps {
  foldersDTO : FoldersDTO[];
  isVisible: IsVisibleProps;
  setIsVisible : Dispatch<SetStateAction<IsVisibleProps>>;
  onPopoverOpener : (event : any, id : string, type : "add" | "edit" | "delete") => void;
  addEditDelete : any;
  anchorEl : any;
  setAnchorEl : Dispatch<SetStateAction<HTMLButtonElement | null>>;
  open : any;
}

interface FolderTreeProps {
  show : boolean;
  selectFolder ?: any;
  update ?: any;
  setUpdate ?: any;
  
}

function FolderAddEditDelete(props : FolderAddEditDeleteProps) {
  const [newFolderName, setNewFolderName] = useState<string>(props.label);
  
  // 폴더명 수정
  const addEditFolderName = useCallback(async () => {
    if (props.addEditDelete === "add") {
      console.log("부모 아이디", props.id)
      const response = await postFolders({
        parentId : props.id,
        label : newFolderName,
        uniqueKey : generatorUtil.uuid()
      })
    } else if (props.addEditDelete === "edit") {
      const response = await putFolders({
        id : props.id,
        label : newFolderName
      });
    }
    props.setAnchorEl(null);
    setNewFolderName("");
  }, [newFolderName, props.addEditDelete, props.anchorEl, props.id]);
  
  // 폴더 삭제
  const removeFolder = useCallback(async () => {
    try {
      const response = await deleteFolder(props.id);
      props.setAnchorEl(null);
    } catch (e) {
      console.log("deleteFolder", e)
    }
  }, [props.id, props.anchorEl]);
  
  // 폴더 추가
  
  return (
    <>
    {props.show ? (
      <StyledEditDelete>
      {(props.isVisible.id === props.id) && props.isVisible.value && (
        <>
          <CustomIconButton key={props.id + "add"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id, "add")}>
            <AddCircleOutlineOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <CustomIconButton key={props.id + "edit"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id, "edit")}>
            <ModeEditOutlineOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <CustomIconButton key={props.id + "delete"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id, "delete")}>
            <DeleteForeverOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <CustomPopover
            open={!!props.anchorEl}
            anchorEl={props.anchorEl}
            onClose={() => props.setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <EditNamePopover
              folderName={newFolderName}
              onChange={(event : ChangeEvent<HTMLInputElement>) => {
                setNewFolderName(event.target.value)
              }}
              onOk={addEditFolderName}
              onDelete={removeFolder}
              onCancel={() => props.setAnchorEl(null)}
              type={props.addEditDelete}
            />
          </CustomPopover>
        </>
      )}
    </StyledEditDelete>) : (
      <></>
    )}
    </>
  )
}

// 폴더의 트리 구조를 만드는 컴포넌트
function makeTreeConstructure(props : TreeConstructureProps) {
  return props.foldersDTO.length
    && (
      <>
        {props.foldersDTO.map((el: FoldersDTO, inx: number) => {
            return (
              <div key={el.id}>
                {
                  el.children!.length ? (
                    <StyledTreeItem
                      key={el.id}
                      onMouseEnter={(event: any) => {
                        console.log("Root hover Event", el.id)
                        props.setIsVisible({id : el.id!, value : true});
                      }}
                      onMouseLeave={() => {props.setIsVisible({id : el.id!, value : false})}}
                    >
                      <TreeItem
                        key={el.id}
                        nodeId={el.id!}
                        label={el.label}
                      >
                        {makeTreeConstructure({
                          show : props.show || false,
                          foldersDTO : el.children!,
                          isVisible: props.isVisible,
                          setIsVisible : props.setIsVisible,
                          onPopoverOpener : props.onPopoverOpener,
                          anchorEl: props.anchorEl,
                          setAnchorEl: props.setAnchorEl,
                          open : props.open,
                          addEditDelete: props.addEditDelete
                        })}
                      </TreeItem>
                      <FolderAddEditDelete
                        show={props.show || false}
                        label={el.label!}
                        id={el.id!}
                        parentId={el.parentId!}
                        isVisible={props.isVisible}
                        onPopoverOpener={props.onPopoverOpener}
                        anchorEl={props.anchorEl}
                        setAnchorEl={props.setAnchorEl}
                        open={props.open}
                        addEditDelete={props.addEditDelete}
                      />
                    </StyledTreeItem>
                  ) : (
                    <StyledTreeItem
                      key={el.id}
                      onMouseEnter={(event: any) => {
                        console.log("Sub hover Event", el.id)
                        props.setIsVisible({id : el.id!, value : true});
                      }}
                      onMouseLeave={() => {props.setIsVisible({id : el.id!, value : false})}}
                    >
                      <TreeItem
                        key={inx}
                        nodeId={el.id!}
                        label={el.label}
                      />
                      <FolderAddEditDelete
                        show={props.show || false}
                        label={el.label!}
                        id={el.id!}
                        isVisible={props.isVisible}
                        parentId={el.parentId!}
                        onPopoverOpener={props.onPopoverOpener}
                        anchorEl={props.anchorEl}
                        setAnchorEl={props.setAnchorEl}
                        open={props.open}
                        addEditDelete={props.addEditDelete}
                      />
                    </StyledTreeItem>
                  )
                }
              </div>
            )
          })
        }
      </>
    )
}

// 폴더 트리구조의 시작
function FolderTree(props : FolderTreeProps) {
  const {
    folderList, isVisible,
    setIsVisible, editAndDeleteFolder,
    anchorEl, setAnchorEl, open, addEditDelete
  } = useFolderTree({
    update : props.update,
  });
  console.log("anchorEl", anchorEl)
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0"]}
      defaultExpandIcon={<AddBoxOutlinedIcon />}
      defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
      onNodeSelect={props.selectFolder}
      sx={{height: "264px", flexGrow: 1}}
    >
      {folderList.length && makeTreeConstructure({
        show : props.show || false,
        foldersDTO : folderList,
        isVisible: isVisible,
        setIsVisible : setIsVisible,
        onPopoverOpener : editAndDeleteFolder,
        anchorEl : anchorEl,
        setAnchorEl : setAnchorEl,
        open: open,
        addEditDelete : addEditDelete
      })}
    </TreeView>
  )
};

export default FolderTree;

const StyledTreeItem = styled.div`
  display: flex;
  align-items: flex-start;
  .MuiTreeItem-content{
    padding: 0 0;
    height: 30px;
    .MuiTreeItem-iconContainer {
      //margin-right: 0;
      //width: 0;
    }
    .MuiTreeItem-label {
      padding-left:4px;
      padding-right: 19px;
      z-index: 2000;
    }
  }
`;

const StyledEditDelete = styled.div`

`;