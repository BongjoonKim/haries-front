import {TreeView} from "@mui/x-tree-view/TreeView";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, {createElement, SyntheticEvent} from "react";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import SubFolder from "../../../containers/global/Sidebar/SubFolder";

interface TreeFolderProps {
  setSelectedFolderId ?: any;
  mainFolders : any[];
}

function TreeFolder(props : TreeFolderProps) {
  
  return (
      <TreeView
        aria-label="customized"
        defaultExpanded={["0"]}
        defaultExpandIcon={<AddBoxOutlinedIcon />}
        onNodeSelect={(event: SyntheticEvent, value : string) => {
          props.setSelectedFolderId(value);
        }}
        defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
      >
        {props.mainFolders?.map((el, inx) => {
          return (
            <TreeItem
              key={inx}
              nodeId={el.id}
              label={el.label}
            >
              {el.childrenId.length > 0 && createElement(
                SubFolder,
                {
                  parentId : el.id,
                  // expanded : expanded!
                }
              )}
            </TreeItem>
            
          )
        })}
      </TreeView>
  )
}

export default TreeFolder;