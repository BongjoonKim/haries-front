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

// 폴더의 트리 구조를 만드는 컴포넌트
function makeTreeConstructure(foldersDTO : FoldersDTO[]) {
  return foldersDTO.length
    && (
      <>
        {foldersDTO.map((el: FoldersDTO, inx: number) => {
            return (
              <>
                {
                  el.children.length ? (
                    <StyledTreeItem>
                      <TreeItem
                        key={inx}
                        nodeId={el.id}
                        label={<>
                          {el.label}

                          </>
                        }
                      >
                        {makeTreeConstructure(el.children)}
                      </TreeItem>
                      <CustomIconButton size="small">
                        <ModeEditOutlineOutlinedIcon fontSize={"small"} />
                      </CustomIconButton>
                      <CustomIconButton size="small">
                        <DeleteForeverOutlinedIcon fontSize={"small"} />
                      </CustomIconButton>
                    </StyledTreeItem>
                  ) : (
                    <StyledTreeItem>
                      <TreeItem
                        key={inx}
                        nodeId={el.id}
                        label={el.label}
                      />
                      <CustomIconButton size="small">
                        <ModeEditOutlineOutlinedIcon fontSize={"small"} />
                      </CustomIconButton>
                      <CustomIconButton size="small">
                      <DeleteForeverOutlinedIcon fontSize={"small"} />
                      </CustomIconButton>
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
  const { folderList } = useFolderTree();
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0"]}
      defaultExpandIcon={<AddBoxOutlinedIcon />}
      defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
      sx={{height: "264px", flexGrow: 1}}
    >
      {folderList.length && makeTreeConstructure(folderList)}
    </TreeView>
  )
};

export default FolderTree;

const StyledTreeItem = styled.div`
  display: flex;
  align-items: flex-start;
  .MuiTreeItem-content{
    padding: 0 0;
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