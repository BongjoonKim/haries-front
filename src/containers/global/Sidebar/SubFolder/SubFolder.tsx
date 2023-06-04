import useSubFolder from "./useSubFolder";
import styled from "styled-components";
import TreeItem from "@mui/lab/TreeItem";

export interface SubFolderProps {
  parentId : string;
  expanded : string[];
}

function SubFolder(props : SubFolderProps) {
  // const {subFolders} = useSubFolder(props);
  
  return (
    <>
      {/*{subFolders?.map((el, inx) => {*/}
      {/*  return (*/}
      {/*    <StyledTreeItem key={inx} nodeId={el.uniqueKey + inx} label={el.label}>*/}
      {/*      /!*<>*!/*/}
      {/*      /!*  {*!/*/}
      {/*      /!*    el.childrenId.map((childId : string) => {*!/*/}
      {/*      /!*      if (!!childId) {*!/*/}
      {/*      /!*        SubFolder({parentId : childId});*!/*/}
      {/*      /!*      }*!/*/}
      {/*      /!*    })*!/*/}
      {/*      /!*  }*!/*/}
      {/*      /!*</>*!/*/}
      {/*    </StyledTreeItem>*/}
      {/*  )*/}
      {/*})}*/}
    </>
  )
}

export default SubFolder;

const StyledTreeItem = styled(TreeItem)`

`;