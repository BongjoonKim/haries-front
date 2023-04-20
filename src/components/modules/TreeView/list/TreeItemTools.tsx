import {Attributes, ComponentClass, createElement, FunctionComponent, ReactNode} from "react";
import {TreeViewComponent} from "../type";
import styled from "styled-components";
import {VscEdit, VscTrash} from "react-icons/vsc";
import Button from "../../../elements/Button/BasicButton";
import validator from "../../../../utilities/validatorUtil";

type CreateElementTypes = [
    string | FunctionComponent<any> | ComponentClass<any, any>,
    any | Attributes | object,
    ReactNode | ReactNode[] | undefined
];

const enum TreeItemToolsActionType {
    EDIT = "tree-view/tools/EDIT",
    DELETE = "tree-view/tools/DELETE",
}

interface TreeItemToolsAction {
    onEdit ?: () => void;
    onDelete ?: () => void;
}

interface TreeItemToolsProps<T, K, P> extends TreeItemToolsAction {
    tools ?: TreeViewComponent.Main<T, K, P>["tools"];
    isChildren ?: boolean;
    insertId ?: TreeViewComponent.Main<T, K, P>["insertId"];
    id: string;
    originalId?: string;
    depth: number;
    treeId?: TreeViewComponent.Main<T, K, P>["treeId"];
    toolsActions ?: TreeViewComponent.Main<T, K, P>["toolsActions"];
    allIndex ?: number[];
    item ?: any;
}

function TreeItemTools<T, K, P>(props: TreeItemToolsProps<T, K, P>) {
    const toolsFilter = (type: TreeItemToolsActionType) => {
        switch (type) {
            case TreeItemToolsActionType.EDIT:
                return props.tools?.manageMenu?.edit && (props.item?.authTypes || []).includes("Edit");
            case TreeItemToolsActionType.DELETE:
                return props.tools?.manageMenu?.delete && (props.item?.authTypes || []).includes("Delete");
            default:
                break;
        }
    };

    return (
        <StyledTreeItemTools className="tree-item-tools">
            {[
                {
                    type: TreeItemToolsActionType.EDIT,
                    element: [VscEdit, {size: 16, color: "#999"}],
                    action : ["onEdit", [props.id, props.item]]
                },
                {
                    type: TreeItemToolsActionType.DELETE,
                    element: [VscTrash, {size: 16, color: "#999"}],
                    action : ["onDelete", [props.id, props.item]]
                }
            ].filter(item => toolsFilter(item.type)).map((item, index) => (
                <Button
                    key={String(index)}
                    className="clear"
                    styles={{padding: "0", height: "initial"}}
                    onClick={() => {
                        props.toolsActions?.[item.action[0] as keyof TreeItemToolsAction](item.action[1]); // 원래는 ...item.action[1]이었음
                    }}
                    children={
                        validator.isCreateElementProps(item.element as never) &&
                        createElement(...(item.element as CreateElementTypes))
                    }
                />
            ))}
        </StyledTreeItemTools>
    )
}

export default TreeItemTools;

const StyledTreeItemTools = styled.div`
    display: flex;
  flex-direction: row;
`;