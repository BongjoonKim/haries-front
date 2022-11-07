import {InitialSelection, ItemKeys, UniqueIdScope} from "./constants";
import {TreeViewComponent} from "./type";
import React, {createRef, useCallback, useEffect, useState} from "react";

function useTreeView<T = string, K = ItemKeys, P = {[x: string]: any}>({
    keys, setUp, initialize, tools, treeId
}: {
    keys ?: TreeViewComponent.Keys<K>;
    setUp ?: TreeViewComponent.Main<T, K, P>["setUp"];
    initialize ?: TreeViewComponent.Main<T, K, P>["initialize"];
    tools ?: TreeViewComponent.Main<T, K, P>["tools"];
    treeId ?: TreeViewComponent.Main<T, K, P>["treeId"];
}) {
    const initialSelected = {
        id: "",
        originalId : "",
        label: "",
        fullLabel: "",
        name: "",
        type: "" as unknown as T,
        options: {} as unknown as P,
        index: {
            all : [],
            current : -1
        },
        depth: -1
    };

    const ref = createRef<HTMLDivElement>();
    const [items, setItems] = useState<TreeViewComponent.Item<T, K, P>[]>([]);
    const [expands, setExpands] = useState<string[]>([]);
    const [selected, setSelected] = useState<TreeViewComponent.selected<T, P>>(initialSelected);
    const [insertId, setInsertId] = useState<Set<string>>(new Set());

    const handleInitialSelected = () => {
        setSelected(initialSelected);
    };

    const handleSetExpands = useCallback(
        (e ?: React.MouseEvent<HTMLElement | HTMLButtonElement, MouseEvent>) =>
            (id: string | string[]) => {
            if (e) e.stopPropagation();
            if (!Array.isArray(id)) {
                const hasExpands = expands.includes(id);
                setExpands((prevState: string[]) => {
                    return hasExpands ? prevState.filter((x: string) => x !== id) : [...prevState, id]});
            } else {
                setExpands((prevState: string[]) => [
                    ...prevState,
                    ...id.filter(item => !prevState.includes(String(item)))
                ]);
            }
        }, [expands]);

    const handleSetSelected: TreeViewComponent.Main<T, K, P>["onSetSelected"] = ({
        id, originalId, label, fullLabel, name, type, options, index, depth
    }) => {
        setSelected({
            id, originalId, label, fullLabel, name, type, options, index, depth
        })
    };

    const handleExpressLabel = useCallback(
        (item : TreeViewComponent.Item<T, K, P>, full ?: boolean): string => {
            const label = full ? "fullLabel" : "label";
            if (
                keys?.label && Array.isArray(keys?.[label]) &&
                item?.[keys?.[label][0]] &&
                item?. [keys?.[label][1]]
            ) {
                const nextLabel = keys?.[label].map((key: string | number) => item?.[key]);
                return nextLabel.join(" ");
            }
            return item?.[keys?.[label] || "label"] || "";
    }, [keys]);

    const handleBranchId = useCallback(
        ({depth, item, allIndex}: TreeViewComponent.BranchID<T, K, P>) => {
            switch (setUp?.uniqueIdScope) {
                case UniqueIdScope.DEPTH:
                    return `${depth} - ${item?.[keys?.id || "id"]}`;
                case UniqueIdScope.UNKNOWN:
                    return `${depth} - ${String(allIndex)} - ${item?.[keys?.id || "id"]}`;
                default:
                    return item?.[keys?.id || "id"];
            }
        }, [keys?.id, setUp?.uniqueIdScope]);

    const handleFirstSelected = useCallback(() =>{
        if (Array.isArray(items) && items?.length > 0) {
            const options: {[x: string]: any} | P = {};
            keys?.options?.forEach((key: keyof P) => {
                (options as P)[key] = (items[0] as unknown as P)[key];
            });
            const branchId = (
                keys?.id === "componentId" && items[0]?.componentId
            ) || handleBranchId({
                depth : 0,
                item: items[0],
                allIndex : [0],
                uniqueIdScope: setUp?.uniqueIdScope
            });
            if (!expands.includes(branchId)) {
                if (selected.id !== branchId) {
                    setSelected({
                        id: branchId,
                        originalId: items[0]?.[keys?.id || "id"] || "",
                        label: handleExpressLabel(items[0]),
                        fullLabel: handleExpressLabel(items[0], true),
                        name: items[0]?.[keys?.name || "name"] || "",
                        type: items[0]?.[keys?.type || "type"] || "",
                        options: options as P,
                        index: {
                            all: [0],
                            current: 0,
                        },
                        depth: 0,

                    });
                }
                if (initialize?.selected?.expand) handleSetExpands()(branchId);
            }
        }
    }, [
        items, keys?.options, keys?.name, keys?.type, handleBranchId, setUp?.uniqueIdScope,
        expands, selected.id, initialize?.selected?.expand, handleSetExpands, handleExpressLabel
    ]);

    const handleInitialize = () => {
        if (Array.isArray(items) && items?.length > 0) {
            switch (initialize?.selected?.type) {
                case InitialSelection.FIRST:
                    handleFirstSelected();
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(handleInitialize,
        [handleFirstSelected, initialize?.selected, items]
    );

    useEffect(() => {
        console.log("tree-view-selected", selected);
    }, [selected]);

    useEffect(() => {
        console.log("tree-view-expands", expands);
    }, [expands]);

    const getTreeViewProps = () => ({
        ref, items, expands, selected, insertId, tools, treeId,
        onSetExpands: handleSetExpands,
        onSetSelected: handleSetSelected,
        onBranchId: handleBranchId,
        onExpressLabel: handleExpressLabel,
        initialize,
        keys,
        setUp,
    });

    return {
        items,
        getTreeViewProps,
        selected,
        setItems,
        setExpands,
        handleInitialSelected,
        setInsertId,
        handleSetExpands,
        insertId
    }
};

export default useTreeView;