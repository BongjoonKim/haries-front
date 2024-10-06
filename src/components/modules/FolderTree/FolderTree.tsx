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
import {Button, Popover} from "@mui/material";
import CustomIconButton from "../../elements/Button/CustomIconButton";
import React, {
  ChangeEvent,
  Dispatch,
  forwardRef,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useState
} from "react";
import CustomPopover from "../../elements/CustomPopover";
import EditNamePopover from "../EditNamePopover";
import {
  deleteFolder,
  getChildFolders,
  getRootFolder,
  postFolders,
  putFolders
} from "../../../endpoints/folders-endpotins";
import generatorUtil from "../../../utilities/generatorUtil";
import useAxios, {axiosUtils} from "../../../utilities/useAxios";

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
  setAddEditDelete: any;
  anchorEl ?: any;
  setAnchorEl ?: Dispatch<SetStateAction<HTMLButtonElement | null>> | any;
  open ?: any;
  setUpdateAlert : any;
}

interface TreeConstructureProps extends FolderTreeProps {
  foldersDTO : FoldersDTO[];
  isVisible: IsVisibleProps;
  setIsVisible : Dispatch<SetStateAction<IsVisibleProps>>;
  onPopoverOpener : (event : any, id : string, type : "add" | "edit" | "delete") => void;
  // addEditDelete : any;
  anchorEl ?: any;
  setAnchorEl ?: Dispatch<SetStateAction<HTMLButtonElement | null>> | any;
  open ?: any;
  setUpdateAlert ?: any;
}

interface FolderTreeProps {
  show : boolean;
  selectFolder ?: any;
  update ?: any;
  setUpdate ?: any;
  
}

function FolderAddEditDelete(props : FolderAddEditDeleteProps) {
  const [newFolderName, setNewFolderName] = useState<string>(props.label);
  const {authEP} = useAxios();
  
  
  // 폴더명 수정
  const addEditFolderName = useCallback(async () => {
    if (props.addEditDelete === "add") {
      console.log("부모 아이디", props.id)
      const resFolder = await authEP({
        func : postFolders,
        reqBody: {
          parentId : props.id,
          label : newFolderName,
          uniqueKey : generatorUtil.uuid()
        }
      })
      props.setAnchorEl(null);
      props.setUpdateAlert((prev:boolean) => !prev)
    } else if (props.addEditDelete === "edit") {
      const response = await authEP({
        func: putFolders,
        reqBody : {
          id : props.id,
          label : newFolderName
        }
      });
      props.setAnchorEl(null);
      props.setUpdateAlert((prev:boolean) => !prev)
    }
    setNewFolderName("");
  }, [newFolderName, props.addEditDelete, props.anchorEl, props.id]);
  
  // 폴더 삭제
  const removeFolder = useCallback(async () => {
    console.log("여기 왔나", props.id)
    try {
      const response = await authEP({
        func : deleteFolder,
        params : {
          id : props.id
        }
      });
      props.setAnchorEl(null);
      props.setUpdateAlert((prev:boolean) => !prev)
    } catch (e) {
      console.log("deleteFolder", e)
    }
  }, [props.id, props.anchorEl]);
  
  // 폴더 추가
  console.log("props.id", props?.id, props.anchorEl?.id, props.anchorEl?.event)
  
  return (
    <>
    {props.show ? (
      <StyledEditDelete>
      {(props.isVisible.id === props.id) && props.isVisible.value && (
        <>
          {/*<CustomIconButton key={props.id + "add"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id, "add")}>*/}
          <CustomIconButton key={props.id + "add"} size="small" onClick={(event : any) => {
            props.setAddEditDelete("add");
            props.setAnchorEl!({id : props.id, event:event.currentTarget})
          }}>
            <AddCircleOutlineOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <CustomIconButton key={props.id + "edit"} size="small" onClick={(event : any) => {
            props.setAddEditDelete("edit");
            props.setAnchorEl!({id : props.id, event:event.currentTarget})
          }}>
            <ModeEditOutlineOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          {/*<CustomIconButton key={props.id + "delete"} size="small" onClick={(event : any) => props.onPopoverOpener(event, props.id, "delete")}>*/}
          <CustomIconButton key={props.id + "delete"} size="small" onClick={(event : any) => {
            props.setAddEditDelete("delete");
            props.setAnchorEl!({id : props.id, event:event.currentTarget})
          }}>
            <DeleteForeverOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <Popover
            open={!!(props.anchorEl?.id === props.id && !!props.anchorEl.event)}
            anchorEl={props.anchorEl?.event}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            onClose={() => {props.setAnchorEl!(null)}}
          >
            <EditNamePopover
              folderName={newFolderName}
              onChange={(event : ChangeEvent<HTMLInputElement>) => {
                setNewFolderName(event.target.value)
              }}
              onOk={addEditFolderName}
              onDelete={removeFolder}
              type={props.addEditDelete}
            />
          </Popover>
        </>
      )}
    </StyledEditDelete>) : (
      <></>
    )}
    </>
  )
}

// 폴더의 트리 구조를 만드는 컴포넌트
const MakeTreeConstructure = forwardRef((props : TreeConstructureProps, ref : any) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [addEditDelete, setAddEditDelete] = useState(null);
  return props.foldersDTO.length
    ? (
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
                        setAnchorEl(null);
                      }}
                      onMouseLeave={() => {
                        props.setIsVisible({id : el.id!, value : false})
                        setAnchorEl(null);
                      }}
                    >
                      <TreeItem
                        key={el.id}
                        nodeId={el.id!}
                        label={el.label}
                      >
                        <MakeTreeConstructure
                          foldersDTO={el.children!}
                          isVisible={props.isVisible}
                          setIsVisible={props.setIsVisible}
                          onPopoverOpener={props.onPopoverOpener}
                          show={props.show || false}
                          ref={ref}
                          setUpdateAlert={props.setUpdateAlert}
                        />
                      </TreeItem>
                      <FolderAddEditDelete
                        show={props.show || false}
                        label={el.label!}
                        id={el.id!}
                        parentId={el.parentId!}
                        isVisible={props.isVisible}
                        onPopoverOpener={props.onPopoverOpener}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        open={props.open}
                        addEditDelete={addEditDelete}
                        setAddEditDelete={setAddEditDelete}
                        setUpdateAlert={props.setUpdateAlert}
                      />
                    </StyledTreeItem>
                  ) : (
                    <StyledTreeItem
                      key={el.id}
                      onMouseEnter={(event: any) => {
                        props.setIsVisible({id : el.id!, value : true});
                        setAnchorEl(null);
                      }}
                      onMouseLeave={() => {
                        props.setIsVisible({id : el.id!, value : false})
                        setAnchorEl(null);
                      }}
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
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        open={props.open}
                        addEditDelete={addEditDelete}
                        setAddEditDelete={setAddEditDelete}
                        setUpdateAlert={props.setUpdateAlert}
                      />
                    </StyledTreeItem>
                  )
                }
              </div>
            )
          })
        }
      </>
    ) : (
      <div ref={ref}></div>
    )
});

// 폴더 트리구조의 시작
function FolderTree(props : FolderTreeProps) {
  const {
    folderList, isVisible,
    setIsVisible, editAndDeleteFolder,
    addEditDelete, popoverRef,
    anchorEl, setAnchorEl,
    setUpdateAlert,
  } = useFolderTree({
    update : props.update,
  });
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0"]}
      defaultExpandIcon={<AddBoxOutlinedIcon />}
      defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
      onNodeSelect={props.selectFolder}
      sx={{height: "264px", flexGrow: 1}}
    >
      {/*{folderList.length ? makeTreeConstructure({*/}
      {/*  show : props.show || false,*/}
      {/*  foldersDTO : folderList,*/}
      {/*  isVisible: isVisible,*/}
      {/*  setIsVisible : setIsVisible,*/}
      {/*  onPopoverOpener : editAndDeleteFolder,*/}
      {/*  addEditDelete : addEditDelete,*/}
      {/*  ref : popoverRef*/}
      {/*}) : (<></>)}*/}
      {folderList.length ? (
        <MakeTreeConstructure
          foldersDTO={folderList}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onPopoverOpener={editAndDeleteFolder}
          show={props.show || false}
          ref={popoverRef}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setUpdateAlert={setUpdateAlert}
        />
      ) : (
        <></>
      )}
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