import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {TreeView} from "@mui/x-tree-view/TreeView";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import useSidebar from "./useSidebar";
import {FoldersDTO} from "../../../types/dto/FoldersDTO";
import {lazy, Suspense, useEffect, useState,createElement} from "react";
import SubFolder from "./SubFolder";

interface SidebarProps {
  isCollapsed : boolean;
}



function Sidebar(props : SidebarProps) {
  const {rootId, mainFolders, expanded} = useSidebar();
  
  // const SubFolder = lazy(() => import("./SubFolder"));
  
  const handleExpandClick = (event : any) => {
    console.log("Expand 확인", event);
    
  }
  
  return (
    <StyledSidebar isCollapsed={props.isCollapsed}>
      <TreeView
        aria-label="customized"
        defaultExpanded={["0"]}
        defaultExpandIcon={<AddBoxOutlinedIcon />}
        defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
        expanded={expanded}
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
  // width: ${props => (props.isCollapsed ? "0px" : "15rem")};
  // min-width: ${props => (props.isCollapsed ? "0px" : "15rem")};
  // transform: ${props => (props.isCollapsed ? "transformX(0)" : "transformX(500px)")};
  width: 6rem;
  transition: all 0.2s ease-out;
  border-right: 1px solid #cfd2d4;
  border-left: 1px solid #e8eaeb;
  background: #fff;
  box-shadow: 0 0 10px #00000026;
  height: 100%;
  position: fixed;
  display:  inline-block;
  flex-direction: column;
  //overflow-x: hidden;
  //overflow-y: auto;
  z-index: 9998;
`;

const StyledTreeItem = styled(TreeItem)`
  li > div {
    width: auto !important;
  }
`;