// 폴더 트리 구조
import {FoldersDTO} from "../../../types/dto/FoldersDTO";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import styled from "styled-components";
import useFolderTree from "./useFolderTree";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CustomButton from "../../elements/Button";
import {Button} from "@mui/material";
import CustomIconButton from "../../elements/Button/CustomIconButton";
import React, {ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useCallback, useState} from "react";
import CustomPopover from "../../elements/CustomPopover";
import EditNamePopover from "../EditNamePopover";
import {putfolders} from "../../../endpoints/folders-endpotins";

export interface IsVisibleProps {
  id : string;
  value : boolean;
}

interface FolderEditDelete extends FolderTreeProps{
  label : string;
  id : string;
  isVisible : IsVisibleProps;
  onPopoverOpener : (event: any, id: string) => void;
  anchorEl : any;
  setAnchorEl : Dispatch<SetStateAction<HTMLButtonElement | null>>;
  open : any;
}

interface TreeConstructureProps extends FolderTreeProps {
  foldersDTO : FoldersDTO[];
  isVisible: IsVisibleProps;
  setIsVisible : Dispatch<SetStateAction<IsVisibleProps>>;
  onPopoverOpener : (event : any, id : string) => void;
  anchorEl : any;
  setAnchorEl : Dispatch<SetStateAction<HTMLButtonElement | null>>;
  open : any;
}

interface FolderTreeProps {
  show : boolean;
}

function FolderEditDelete(props : FolderEditDelete) {
  const [newFolderName, setNewFolderName] = useState<string>(props.label);
  // 폴더명 수정
  const editFolderName = useCallback(async () => {
    const response = await putfolders({
      id : props.id,
      label : newFolderName
    });
    console.log("response", response.data);
  }, [newFolderName]);
  return (
    <>
    {props.show ? (<StyledEditDelete>
      {(props.isVisible.id === props.id) && props.isVisible.value && (
        <>
          <CustomIconButton key={props.id + "edit"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id)}>
            <ModeEditOutlineOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <CustomIconButton key={props.id + "delete"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id)}>
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
              onOk={editFolderName}
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
                        })}
                      </TreeItem>
                      <FolderEditDelete
                        show={props.show || false}
                        label={el.label!}
                        id={el.id!}
                        isVisible={props.isVisible}
                        onPopoverOpener={props.onPopoverOpener}
                        anchorEl={props.anchorEl}
                        setAnchorEl={props.setAnchorEl}
                        open={props.open}
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
                      <FolderEditDelete
                        show={props.show || false}
                        label={el.label!}
                        id={el.id!}
                        isVisible={props.isVisible}
                        onPopoverOpener={props.onPopoverOpener}
                        anchorEl={props.anchorEl}
                        setAnchorEl={props.setAnchorEl}
                        open={props.open}
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
    anchorEl, setAnchorEl, open
  } = useFolderTree();
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0"]}
      defaultExpandIcon={<AddBoxOutlinedIcon />}
      defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
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
        open: open
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