import {
    HandleSetSelectedItemFunction,
    HandleSetUpdatedItemsFunction,
    TreeViewItem,
    UpdateItemsActionType,
    UseAsideTreeProps
} from "./types";
import {resolveObjectURL} from "buffer";
import {useEffect, useState} from "react";
import useTreeView from "../../../../modules/TreeView/useTreeView";
import {InitialSelection} from "../../../../modules/TreeView";
import {atom, useRecoilState} from "recoil";
import {TreeViewComponent} from "../../../../modules/TreeView/type";
import CreateFolder, {CreateFolerProps} from "../CreateFolder";
import {deleteFolder, getPropjectTreeStructureList} from "../../../../../endpoints/common-endpoints";

const TreeViewItemUtil = {
    createIcon(type?: string) {
        if (type==="project") {
            return `${process.env.PUBLIC_URL}/logo192`
        }
        if (type==="folder") {
            return `${process.env.PUBLIC_URL}/logo192`
        }
        return "";
    },

    generateChildren(items: TreeViewItem[], parentItem: TreeViewItem): TreeViewItem[] {
        return items.map(_item => {
            const _new = {
                ..._item,
                icon: this.createIcon(_item.type),
                path: `${parentItem.path}/${_item.id}`,
                pathName:
                    parentItem.type === "root"
                        ? `${parentItem.id}/${_item.name}`
                        : `${parentItem.pathName}/${_item.name}`,
                authTypes:
                    parentItem.path.split("/").length > 2 ? (_item?.data?.outData?.this_authType || "").split("/") : [],
            };
            if (_new.children?.length) {
                _new.children = this.generateChildren(_new.children, _new);
            }
            return _new;
        });
    },
    find(id: string, items: TreeViewItem[]): TreeViewItem | null {
        let isFind = false;
        let that = null;
        const finder = (_items: TreeViewItem[]) => {
            _items.forEach(_item => {
                if (isFind) return;
                if(_item.id === id) {
                    that = _item;
                    isFind = true;
                    return;
                }
                if (_item.children?.length) {
                    finder(_item.children)
                }
            })
        }
        finder(items);
        return that;
    },
    update(items: TreeViewItem[], updateItem: TreeViewItem, action: UpdateItemsActionType): any[] {
        const findPath =
            action === "INSERT" ? updateItem.path : updateItem.path?.substring(0, updateItem.path.lastIndexOf("/"));
        if (!findPath) return items;
        return items.map(_item => {
            if (_item.path === findPath) {
                if (action === "INSERT") {
                    return {...updateItem};
                }
                if (action === "UPDATE") {
                    return {
                        ..._item,
                        children: _item.children?.map((_childItem: TreeViewItem) =>
                            _childItem.id === updateItem.id ? updateItem : _childItem
                        )
                    }
                }
                if (action === "DELETE") {
                    const children = _item.children?.filter((_childItem: TreeViewItem) => _childItem.id !== updateItem.id)
                        .map((_childItem: any) => _childItem);
                    return {
                        ..._item,
                        hasChildren: children && children.length > 0,
                        children
                    }
                }
            }
            if (_item.children?.length) {
                return {..._item, children: this.update(_item.children, updateItem, action)};
            }
            return _item;
        })
    }
}

export const designCollabState = {
    selectedTreeItem: atom<TreeViewComponent.Keys>({
       key: "selectedTreeItem",
       default: {
           id: ""
       }
    })
}

function useAsideTree({ projectYear, handleChangeStatus }: UseAsideTreeProps) {
    const root: TreeViewItem = {
        id: projectYear,
        name: projectYear,
        label: projectYear,
        type: "root",
        path: projectYear,
    };
    const [initialSelected, setInitialSelected] = useState<string>("");
    const {
        getTreeViewProps: getTreeViewCommonProps,
        selected,
        items,
        setItems,
        setExpands
    } = useTreeView({
        keys: {
            id: "id",
            name: "name",
            label: "name",
            type: "type",
            icon: "icon",
            options: ["data", "path", "pathName"]
        },
        initialize: {
            selected: {
                type: InitialSelection.COMPARE,
                compare: [initialSelected, "id"],
                expand: true,
            }
        },
        tools: {
            manageMenu: {
                edit: true,
                delete: true
            }
        }
    });
    const [ selectedTreeItem, setSelectedTreeItem ] = useRecoilState(designCollabState.selectedTreeItem);
    const [fetchedItems, setFetchedItems] = useState<Set<string>>(new Set());

    const treeViewCommonProps = getTreeViewCommonProps();
    const getTreeViewProps = () => {
        return {
            ...treeViewCommonProps,
            onSetExpands: (e?: React.MouseEvent<HTMLElement | HTMLButtonElement, MouseEvent>) =>
                (id: string | string[]) => {
                    const expandId: string | null = Array.isArray(id) ? id[id.length - 1] : id;
                    if (expandId && expandId !== root.id && !fetchedItems.has(expandId)) {
                        const item = TreeViewItemUtil.find(expandId, items as TreeViewItem[]);
                        if (!item?.path) return;
                        fetchProjectTreeStructureList(item.path).then((structureList: any[]) => {
                            setFetchedItems(new Set(fetchedItems).add(item.id));
                            const updateItem = {
                                ...item,
                                children: TreeViewItemUtil.generateChildren(structureList || [], item)
                            };
                            setItems(TreeViewItemUtil.update(items as TreeViewItem[], updateItem, "UPDATE"));
                        });
                    }
                    treeViewCommonProps.onSetExpands(e)(id);
                },
            toolsActions: {
                onEdit(id: string, item: any) {
                    if (!item?.data?.obid) return;
                    handleChangeStatus({
                        id: "MODIFY_FOLDER",
                        options: {
                            getContentsProps: (): CreateFolerProps => ({
                                obid: item.data.obid,
                                saveCallback() {
                                    handleSetUpdatedItems(item, "UPDATE");
                                    handleChangeStatus({id: ""})
                                },
                                cancelCallback() {
                                    handleChangeStatus({id: ""})
                                }
                            })
                        }
                    })
                },
                onDelete(id:string, item:any) {
                    if(!item?.data?.obid) return;
                    // Confirm({
                    //     title: "Are you sure you want to delete it",
                    //     onOk: () => {
                    //         deleteFolder(item.data.obid)
                    //             .then(() => handleSetUpdatedItems(itme, "DELETE"))
                    //             .catch(error => console.log("delete error", error));
                    //     }
                    // })
                }
            }
        }
    }

    useEffect(() => {
        if(selected.id !== selectedTreeItem.id) {
            setSelectedTreeItem(selected);
        }
    }, []);

    const fetchProjectTreeStructureList = async (searchPath: string) => {
        try {
            const {data} = await getPropjectTreeStructureList({searchPath});
            return data.data || [];
        } catch (error) {
            return Promise.reject(error);
        }
    };

    useEffect(() => {
        setExpands([]);
        fetchProjectTreeStructureList(projectYear).then((structureList: any[]) => {
           const children = TreeViewItemUtil.generateChildren(structureList || [], root);
           if (children.length) {
               setInitialSelected(children[0].id);
           }
           setItems([{...root, children}]);
        });
    }, [projectYear]);

    const handleSetUpdatedItems: HandleSetUpdatedItemsFunction = (item, action) => {
        if(!item) return;
        if (action === "INSERT") {
            const parentPath = item.path ? item.path : root.path;
            const parentItem = TreeViewItemUtil.find(
                parentPath.split("/").pop() as string,
                items as TreeViewItem[]
            );
            if (!parentItem) return;
            fetchProjectTreeStructureList(parentPath).then((structureList: any[]) => {
                const updateChildren = TreeViewItemUtil.generateChildren(
                    structureList || [],
                    parentItem,
                ).map(_item => {
                    const _originItem = parentItem.children?.find(_childItem => _childItem.id === _item.id);
                    return _originItem ? _originItem : _item;
                });
                setItems(
                    TreeViewItemUtil.update(
                        items as TreeViewItem[],
                        {...parentItem, hasChildren: updateChildren.length > 0, children: updateChildren},
                        "INSERT"
                    )
                )
            })
        } else if (action === "UPDATE") {
            const parentPath = item.path?.substring(0, item.path.lastIndexOf("/"));
            const parentItem = TreeViewItemUtil.find(
                parentPath.split("/").pop() as string,
                items as TreeViewItem[]
            );
            if (!parentItem) return;
            fetchProjectTreeStructureList(parentPath).then((structureList: any[]) => {
                const updateItem = TreeViewItemUtil.generateChildren(
                    structureList || [],
                    parentItem,
                ).find(_item => _item.id === item.id);
                if (!updateItem) return;
                if (updateItem.id === selectedTreeItem.id) {
                    setSelectedTreeItem({
                        ...selectedTreeItem, label: updateItem.label, name: updateItem.name, options: {
                            data: updateItem.data,
                            path: updateItem.path,
                            pathName: updateItem.pathName
                        }
                    })
                }
                setItems(
                    TreeViewItemUtil.update(
                        items as TreeViewItem[],
                        {...updateItem, children: item.children},
                        "UPDATE"
                    )
                )
            })
        } else if (action === "DELETE") {
            if (!item.id) return;
            if (item.id === selectedTreeItem.id) {
                const parentPath = item.path?.substring(0, item.path.lastIndexOf("/"));
                handleSetSelectedItem(parentPath.split("/").pop() as string, false);
            }
            setItems(TreeViewItemUtil.update(items as TreeViewItem[], item, "DELETE"));
        }
    }

    const handleSetSelectedItem : HandleSetSelectedItemFunction = (id, isExpand = true) => {
        const item = TreeViewItemUtil.find(id, items as TreeViewItem[]);
        if (!item) return;
        const { onSetSelected, onSetExpands } = getTreeViewProps();
        onSetSelected({
            id: item.id,
            label: item.name,
            name: item.name,
            type: item.type!,
            options: {
                data: item.data,
                path: item.path,
                pathName: item.pathName
            },
            index: {
                all:[],
                current: -1,
            },
            depth: item.path.length - 1
        })
        if (isExpand) {
            onSetExpands()(item.path.split("/"))
        }
    }

    return {
        getTreeViewProps,
        selected,
        items,
        setItems,
        setExpands,
        handleSetUpdatedItems,
        handleSetSelectedItem
    }


}

export default useAsideTree;