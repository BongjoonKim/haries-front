import styled from "styled-components";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem, {TreeItemProps, useTreeItem, TreeItemContentProps} from "@mui/lab/TreeItem";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

interface SidebarProps {
  isCollapsed : boolean;
}
function Sidebar(props : SidebarProps) {
  return (
    <StyledSidebar isCollapsed={props.isCollapsed}>
      <TreeView
        aria-label="customized"
        defaultExpanded={["0"]}
        defaultExpandIcon={<AddBoxOutlinedIcon />}
        defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
        sx={{height: "264px", flexGrow: 1, overflowY: "auto"}}
      >
        <StyledTreeItem nodeId="1" label="Main" >
          <StyledTreeItem nodeId="2" label="sub" />
          <StyledTreeItem nodeId="3" label="sub2" />
        </StyledTreeItem>
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