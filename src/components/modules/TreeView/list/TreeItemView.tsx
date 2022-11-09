import styled from "styled-components";
import {TreeViewComponent} from "../type";
import {AiFillMinusSquare, AiFillPlusSquare, AiFillSetting} from "react-icons/ai";
import {GrDocument} from "react-icons/gr";
import {SelectionFormat} from "../constants";
import {createElement} from "react";
import TreeItemTools from "./TreeItemTools";
import Image from "../../Image/Image";
import {CreateElementTypes} from "../../../../types/template";

interface TreeItemViewProps<T, K, P> extends TreeViewComponent.TreeItem<T, K, P> {
    onBranchSelected: (props: TreeViewComponent.TreeItem<T, K, P>) => void;
}



function TreeItemView<T, K, P>(props: TreeItemViewProps<T, K, P>) {
    const IconBranch = (params?: {image?: string}) => {
        if (params?.image) {
            return [
                Image,
                {
                    src: params.image,
                    className: "tree-icon-type"
                }
            ]
        }
        if (props.children?.length > 0 || props.hasChildren)
            return [AiFillSetting, {className: "tree-icon-type", color: "#666", size:15}];
        return [GrDocument, {className: "tree-icon-type", color: "#666"}];
    };

    const isChildren = props.children?.length > 0 || props.hasChildren;

    // @ts-ignore
    // @ts-ignore
    return (
        <StyledTreeItemView
            id={props.id}
            title={props.label}
            data-type={props.type}
            data-options={props.options}
            data-depth={props.depth}
            data-parent-id={props.parentId || ""}
            data-index={props.index}
        >
            <div className="tree-item-start">
                <div
                    className="tree-item-expand"
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        if (props.setUp?.selectionFormat !== SelectionFormat.ALL) {
                            props.onSetExpands(e)(
                                props.expands?.includes(props.id) ? props.id : [...props.allParentId, props.id]
                            )
                        }
                    }}
                >
                    {isChildren &&
                        createElement(
                            props.expands?.includes(props.id) ? AiFillMinusSquare : AiFillPlusSquare,
                            {
                                className: "tree-icon-expand",
                                color: props.expands?.includes(props.id) ? "#50034" : "#666",
                                size: 16
                            }
                        )
                    }
                </div>
                <div
                    className="tree-item-body"
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        if (props.setUp?.selectionFormat !== SelectionFormat.ALL) props.onBranchSelected(props);
                    }}
                >
                    {createElement(
                        ...(IconBranch({
                            image : props.item?.[props.keys?.icon]
                        }) as CreateElementTypes)
                    )}
                    <span className="tree-item-label">{props.label}</span>
                </div>
            </div>
            <div className="tree-item-end">
                <TreeItemTools<T, K, P>
                    tools={props.tools}
                    isChildren={isChildren}
                    insertId={props.insertId}
                    id={props.id}
                    originalId={props.originalId}
                    depth={props.depth}
                    toolsActions={props.toolsActions}
                    allIndex={props.allIndex}
                    item={props.item}
                />
            </div>
        </StyledTreeItemView>
    )

}

export default TreeItemView;


const StyledTreeItemView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 5px 0;
  .tree-item {
    display: flex;
    align-items: center;
    &-start {
    }
    &-body {
      margin: 0 3px;
      height: 100%;
      flex-direction: row;
    }
    &-label {
      font-size: 14px;
      user-select: none;
    }
    &-expand,
    &-body,
    &-start {
      display: flex;
      align-items: center;
    }
  }
`;