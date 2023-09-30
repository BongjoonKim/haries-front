// 폴더 트리 구조
import {FoldersDTO} from "../../../types/dto/foldersDTO";
import styled from "styled-components";
import TreeItem from "@mui/lab/TreeItem";
import useFolderTree from "./useFolderTree";
import TreeView from "@mui/lab/TreeView";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

function makeTreeConstructure(foldersDTO : FoldersDTO[]) {
  return foldersDTO.length
    && (
      <>
        {foldersDTO.map((el: FoldersDTO, inx: number) => {
          console.log("el", el)
            return (
              <>
                {
                  el.children.length ? (
                    <StyledTreeItem
                      key={inx}
                      nodeId={el.id}
                      label={el.label}
                    >
                      {makeTreeConstructure(el.children)}
                    </StyledTreeItem>
                  ) : (
                    <StyledTreeItem
                      key={inx}
                      nodeId={el.id}
                      label={el.label}
                    />
                  )
                }
              </>
            )
          })
        }
      </>
    )
// : (
//       <>sdfsdf</>
//     )
  
}

//
function FolderTree() {
  const { folderList } = useFolderTree();
  console.log("folderList", folderList);
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

const StyledTreeItem = styled(TreeItem)`

`;