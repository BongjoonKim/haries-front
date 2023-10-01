// 폴더 트리 구조
import {FoldersDTO} from "../../../types/dto/foldersDTO";
import styled from "styled-components";
import TreeItem from "@mui/lab/TreeItem";
import useFolderTree from "./useFolderTree";
import TreeView from "@mui/lab/TreeView";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CustomButton from "../../elements/Button";
import {Button} from "@mui/material";
import CustomIconButton from "../../elements/Button/CustomIconButton";
import {Dispatch, MouseEventHandler, SetStateAction} from "react";

export interface IsVisibleProps {
  id : string;
  value : boolean;
}

interface FolderTreeProps {
  foldersDTO : FoldersDTO[];
  isVisible: IsVisibleProps;
  setIsVisible : Dispatch<SetStateAction<IsVisibleProps>>;

}

interface FolderEditDelete {
  label : string;
  id : string;
  isVisible : IsVisibleProps;
}

// 폴더의 트리 구조를 만드는 컴포넌트
function makeTreeConstructure(props : FolderTreeProps) {
  return props.foldersDTO.length
    && (
      <>
        {props.foldersDTO.map((el: FoldersDTO, inx: number) => {
            return (
              <>
                {
                  el.children.length ? (
                    <StyledTreeItem
                      key={el.id}
                      onMouseEnter={(event: any) => {
                        props.setIsVisible({id : el.id, value : true});
                      }}
                      onMouseLeave={() => {props.setIsVisible({id : el.id, value : false})}}
                    >
                      <TreeItem
                        key={inx}
                        nodeId={el.id}
                        label={el.label}
                      >
                        {makeTreeConstructure({
                          foldersDTO : el.children,
                          isVisible: props.isVisible,
                          setIsVisible : props.setIsVisible
                        })}
                      </TreeItem>
                      <FolderEditDelete label={el.label} id={el.id} isVisible={props.isVisible} />
                    </StyledTreeItem>
                  ) : (
                    <StyledTreeItem
                      key={el.id}
                      onMouseEnter={(event: any) => {
                        console.log("event", el.id);
                        props.setIsVisible({id : el.id, value : true});
                      }}
                      onMouseLeave={() => {props.setIsVisible({id : el.id, value : false})}}

                    >
                      <TreeItem
                        key={inx}
                        nodeId={el.id}
                        label={el.label}
                      />
                      <FolderEditDelete label={el.label} id={el.id} isVisible={props.isVisible} />
                    </StyledTreeItem>
                  )
                }
              </>
            )
          })
        }
      </>
    )
}

// 폴더 트리구조의 시작
function FolderTree() {
  const { folderList, isVisible, setIsVisible } = useFolderTree();
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0"]}
      defaultExpandIcon={<AddBoxOutlinedIcon />}
      defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
      sx={{height: "264px", flexGrow: 1}}
      // onMouseEnter={() => {setIsVisible({id : el.id, value : true})}}
      // onMouseLeave={() => {setIsVisible({id : el.id, value : false})}}

    >
      {folderList.length && makeTreeConstructure({
        foldersDTO : folderList,
        isVisible: isVisible,
        setIsVisible : setIsVisible
      })}
    </TreeView>
  )
};

function FolderEditDelete(props : FolderEditDelete) {
  // console.log("보여지기", props.label, props.id, props.isVisible.id, props.isVisible.value)
  return (
    <StyledEditDelete>
      {(props.isVisible.id === props.id) && props.isVisible.value && (
        <>
          <CustomIconButton size="small">
            <ModeEditOutlineOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
          <CustomIconButton size="small">
          <DeleteForeverOutlinedIcon fontSize={"small"} />
          </CustomIconButton>
        </>
      )}
      
    </StyledEditDelete>
  )
}

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
    }
  }
`;

const StyledEditDelete = styled.div`

`;