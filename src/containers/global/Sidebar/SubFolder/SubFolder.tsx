import useSubFolder from "./useSubFolder";
import styled from "styled-components";
import TreeItem from "@mui/lab/TreeItem";
import {createElement, useCallback, useEffect} from "react";
import {getChildFolders} from "../../../../endpoints/folders-endpotins";

export interface SubFolderProps {
  parentId : string;
  expanded ?: string[];
}

function SubFolder(props : SubFolderProps) {
  const {subFolders, setSubFolders} = useSubFolder(props);
  // useSubFolder(props);
  console.log("확인", props)
  return (
    <>
      {subFolders?.map((el : any, inx : number) => {
        return (
          <StyledTreeItem key={inx} nodeId={el.uniqueKey + inx} label={el.label}>
            {el.childrenId.length > 0 && createElement(
              SubFolder,
              {
                parentId : el.id,
                expanded : props.expanded!,
              }
            )}
          </StyledTreeItem>
        )
      })}
    </>
  )
}

export default SubFolder;

const StyledTreeItem = styled(TreeItem)`

`;