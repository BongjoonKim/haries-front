import {TreeViewComponent} from "../type";
import TreeItem from "./TreeItem";
import styled from "styled-components";
import converter from "../../../../utilities/converter";
import {createElement} from "react";
import {degree} from "../constants";

function TreeItems<T, K, P>(props: TreeViewComponent.Main<T, K, P>) {
    return props.items
        ?.filter(x => x)
        ?.map(
            (item: TreeViewComponent.Item<T, K, P> | { [x: string]: any}, index: number) => {
                const depth = 0;
                const allIndex = [index];
                const branchId = (
                    props.keys?.id === "componentId" && item?.componentId) ||
                    props.onBranchID({
                        depth,
                        item,
                        allIndex,
                        uniqueIdScope: props?.setUp?.uniqueIdScope
                    });
                return (
                    <TreeItem<T, K, P>
                        key={branchId}
                        id={branchId}
                        keys={props.keys}
                        label={props.onExpressLabel(item as TreeViewComponent.Item<T, K, P>)}
                        fullLabel={item?.fullName}
                        type={item?.[props.keys?.type || "type"]}
                        name={item?.[props.keys?.name || "name"]}
                        item={item}
                        initialSelected={
                            props.initialize?.selected?.compare?.[0] &&
                            props.initialize?.selected?.compare?.[1] &&
                            item?.[props.initialize?.selected?.compare?.[1]]
                        }
                        children={item?.[props.keys?.children || "children"]}
                        hasChildren={item?.hasChildren}
                        expands={props.expands}
                        selected={props.selected}
                        onSetExpands={props.onSetExpands}
                        setUp={props.setUp}
                        onSetSelected={props.onSetSelected}
                        onBranchID={props.onBranchID}
                        onExpressLabel={props.onExpressLabel}
                        initialize={props.initialize}
                        tools={props.tools}
                        allIndex={[index]}
                        allParentId={[]}
                        index={index}
                        depth={depth}
                        insetId={props.insertId}
                        extraData={item.extraData}
                        toolsActions={props.toolsActions}
                    />
                )
            }
        )
}

export default function TreeList<T, K, P>(props: TreeViewComponent.Main<T, K, P>) {
    return (
        <StyledTreeList className={converter.classNames(["tree-list", degree[0]])}>
            {createElement("div", {
                children: Array.isArray(props.items) && TreeItems<T, K, P>(props)
            })}
        </StyledTreeList>
    )
}

export const StyledTreeList = styled.ul`
  position: relative;
  width: max-content;
`;