interface TreeViewItem {
    id: string;
    name: string;
    label: string;
    type?: string;
    icon?: string;
    hasChildren?: boolean;
    children ?: TreeViewItem[];
    data ?: {[key: string]: any};
    path: string;
    pathName?: string;
    authTypes?: string[];
    options?: {[key: string]:any};
}

interface UseAsideTreeProps {
    projectYear: string;
    handleChangeStatus: Modal.onChangeStatus;
}

type UpdateItemsActionType = "INSERT" | "UPDATE" | "DELETE";
type HandleSetSelectedItemFunction = (id: string, isExpand?: boolean) => void;
type HandleSetUpdatedItemsFunction = (item: TreeViewItem, action: UpdateItemsActionType) => void;

export { TreeViewItem ,UseAsideTreeProps };
export type { UpdateItemsActionType, HandleSetSelectedItemFunction, HandleSetUpdatedItemsFunction};

