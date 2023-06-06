import useSubFolder from "./useSubFolder";
import styled from "styled-components";
import TreeItem from "@mui/lab/TreeItem";
import {createElement, useCallback, useEffect} from "react";
import {getChildFolders} from "../../../../endpoints/folders-endpotins";

export interface SubFolderProps {
  parentId : string;
  expanded ?: string[];
  subFolders : any;
  setSubFolders : any;
}

function SubFolder(props : SubFolderProps) {
  const {subFolders, setSubFolders} = useSubFolder(props);
  useSubFolder(props);
  
  return (
    <>
      {props.subFolders?.map((el : any, inx : number) => {
        return (
          <StyledTreeItem key={inx} nodeId={el.uniqueKey + inx} label={el.label}>
            {/*<>*/}
            {/*  {*/}
            {/*    el.childrenId.map((childId : string) => {*/}
            {/*      if (!!childId) {*/}
            {/*        SubFolder({parentId : childId});*/}
            {/*      }*/}
            {/*    })*/}
            {/*  }*/}
            {/*</>*/}
            {el.childrenId.length > 0 && createElement(
              SubFolder,
              {
                parentId : el.id,
                expanded : props.expanded!,
                subFolders : subFolders,
                setSubFolders : setSubFolders
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