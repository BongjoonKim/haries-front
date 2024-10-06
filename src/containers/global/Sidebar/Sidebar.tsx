import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {TreeView} from "@mui/x-tree-view/TreeView";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import useSidebar from "./useSidebar";
import {FoldersDTO} from "../../../types/dto/FoldersDTO";
import {lazy, Suspense, useEffect, useState, createElement, useCallback} from "react";
import SubFolder from "./SubFolder";

export interface SidebarProps {
  isCollapsed : boolean;
  folderId ?: string;
  setFolderId : any;
}



function Sidebar(props : SidebarProps) {
  const {rootId, mainFolders, expanded, handleSelectTree} = useSidebar(props);
  
  return (
    <StyledSidebar isCollapsed={props.isCollapsed} className="pc">
      <TreeView
        aria-label="customized"
        defaultExpanded={["0"]}
        defaultExpandIcon={<AddBoxOutlinedIcon />}
        defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
        expanded={expanded}
        onNodeSelect={handleSelectTree}
      >
        <>
          {mainFolders?.map((el, inx) => {
            return (
              <StyledTreeItem
                key={inx}
                nodeId={el.id!}
                label={el.label}
              >
                { el.childrenId && el.childrenId.length > 0 &&
                  
                  createElement(
                    SubFolder,
                    {
                      parentId : el.id!,
                      expanded : expanded!
                    }
                  )
                }
              </StyledTreeItem>
            )
          })}
        </>
      </TreeView>
    </StyledSidebar>
  )
}

export default Sidebar;

const StyledSidebar = styled.div<{isCollapsed: boolean}>`
  width: 8rem;
  position: relative;
  //transition: all 0.2s ease-out;
  //border-right: 1px solid #cfd2d4;
  //border-left: 1px solid #e8eaeb;
  //box-shadow: 0 0 10px #00000026;
  //position: absolute;
  display:  inline-block;
  flex-direction: column;
  padding: 2rem 0;
  //overflow-x: hidden;
  //overflow-y: auto;
  z-index: 9998;
  display: block;
  @media screen and (max-width: 500px) {
    &.pc {
      display: none !important;
    }
  }
`;

const StyledTreeItem = styled(TreeItem)`
  li {
    div {
      width: auto !important;
      padding : 0;
    }
  }
`;