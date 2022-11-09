import {TreeViewComponent} from "../type";
import useTreeItem from "./useTreeItem";
import styled from "styled-components";
import {SelectionFormat} from "../constants";
import converter from "../../../../utilities/converter";
import TreeView from "../TreeView";
import {animated} from "react-spring";
import {createElement} from "react";
import { StyledTreeList } from "./TreeList";
import TreeItemView from "./TreeItemView";
import {degree} from "../constants";



function TreeItem<T, K, P>(props: TreeViewComponent.TreeItem<T, K, P>) {
    const {springs, handleBranchSelected} = useTreeItem<T, K, P>(props);

    const RecursiveItem = ({
       depth,
       parentId,
       allIndex,
       allParentId,
    } : {
        depth: TreeViewComponent.TreeItem<T, K, P>["depth"];
        parentId : string;
        allIndex: number[];
        allParentId: string[] | number[];
    }) => {
        return props.children.map(
            (item: TreeViewComponent.TreeItem<T, K, P>, index: number) => (
                <TreeItem<T, K, P>
                    key={item?.[props.keys?.id || "id"]}
                    id={
                        (props.keys?.id === "componentId" && item?.componentId) ||
                        props.onBranchID({
                            depth, item, allIndex, uniqueIdScope: props?.setUp?.uniqueIdScope,
                        })
                    }
                    originalId={item?.[props.keys?.id || "id"]}
                    label={props.onExpressLabel(item)}
                    fullLabel={item?.fullName}
                    type={item?.[props.keys?.type || "type"]}
                    name={item?.[props.keys?.name || "name"]}
                    initialSelected={
                        props.initialize?.selected?.compare?.[0] &&
                        props.initialize?.selected?.compare?.[1] &&
                        item?.[props.initialize?.selected?.compare?.[1]]
                    }
                    keys={props.keys}
                    item={item}
                    index={index}
                    children={item?.[props.keys?.children || "children"]}
                    hasChildren={item?.hasChildren}
                    expands={props.expands}
                    selected={props.selected}
                    setUp={props.setUp}
                    onSetExpands={props.onSetExpands}
                    onSetSelected={props.onSetSelected}
                    onBranchID={props.onBranchID}
                    onExpressLabel={props.onExpressLabel}
                    initialize={props.initialize}
                    depth={depth}
                    parentId={parentId}
                    allIndex={[...allIndex, index]}
                    allParentId={[...allParentId, parentId]}
                    tools={props.tools}
                    insertId={props.insertId}
                    treeId={props.treeId}
                    toolsActions={props.toolsActions}
                />
            )
        )
    }
    return (
        <StyledTreeItem
            className="tree-item"
            onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                if (props.setUp?.selectionFormat === SelectionFormat.ALL) {
                    props.onSetExpands(e)(props.id);
                    handleBranchSelected(props);
                }
            }}
            onDoubleClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                props.onSetExpands(e)(props.id);
                handleBranchSelected(props);
            }}
        >
            <StyledTreeItemInside
                className={converter.classNames([
                    "tree-item-inside",
                    props.selected?.id === props.id ? "selected" : undefined,
                    degree[props.depth],
                ])}
            >
                <TreeItemView<T, K, P> onBranchSelected = {handleBranchSelected} {...props} />
            </StyledTreeItemInside>
            <animated.div className="select-dropdown" style={springs}>
                {createElement(StyledTreeList, {
                    className: converter.classNames(["tree-list", degree[props.depth + 1]]),
                    children:
                        Array.isArray(props.children) &&
                        RecursiveItem({
                            depth: props.depth + 1,
                            parentId: props.id,
                            allIndex: props.allIndex,
                            allParentId: props.allParentId
                        })
                })}
            </animated.div>
        </StyledTreeItem>
    )
}

export default TreeItem;

const StyledTreeItemInside = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  &.selected {
    font-weight: 600;
  }
  .tree-icon {
    margin-right: 5px;
  }
  .info-status-icon {
    margin-left: 5px;
  }
`;

const StyledTreeItem = styled.li`
  font-size: 13px;
  position: relative;
  width:max-content;
  .select {
    &-dropdown {
      z-index: 1;
      margin-top: 1px;
      border-radius: 5px;
      overflow: hidden;
      width: max-content;
    }
  }
`;