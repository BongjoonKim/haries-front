import styled from "styled-components";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem, {TreeItemProps, useTreeItem, TreeItemContentProps} from "@mui/lab/TreeItem";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import useSidebar from "./useSidebar";
import {FoldersDTO} from "../../../types/dto/foldersDTO";
import {lazy, Suspense, useEffect, useState,createElement} from "react";
import SubFolder from "./SubFolder";

interface SidebarProps {
  isCollapsed : boolean;
}



function Sidebar(props : SidebarProps) {
  const {rootId, mainFolders, subFolders, setSubFolders} = useSidebar();
  console.log("루트아이디", rootId, mainFolders);
  
  // const SubFolder = lazy(() => import("./SubFolder"));
  const [expanded, setExpanded] = useState<string[]>();
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
        sx={{height: "264px", flexGrow: 1, overflowY: "auto"}}
      >
        <>
          {mainFolders?.map((el, inx) => {
            return (
              <StyledTreeItem
                key={inx}
                nodeId={el.id}
                label={el.label}
                
              >
                { el.childrenId.length > 0 &&
                  createElement(
                    SubFolder,
                    {
                      parentId : el.id,
                      expanded : expanded!,
                      subFolders : subFolders,
                      setSubFolders : setSubFolders
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
  width: ${props => (props.isCollapsed ? "0px" : "15rem")};
  min-width: ${props => (props.isCollapsed ? "0px" : "15rem")};
  transition: all 0.2s ease-out;
  border-right: 1px solid #cfd2d4;
  border-left: 1px solid #e8eaeb;
  background: #fff;
  box-shadow: 0 0 10px #00000026;
  display:  inline-block;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 9998;
`;

const StyledTreeItem = styled(TreeItem)`

`;