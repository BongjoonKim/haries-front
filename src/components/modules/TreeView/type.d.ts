import React from "react";
import {InitialSelection, SelectionFormat, UniqueIdScope} from "./constants";

declare namespace TreeViewComponent {
    type OptionsKey = string[];

    type Keys<
        keys={
            id : "id";
            label : "label";
            fullLabel: "fullLabel";
            name: "name";
            type: "type";
            icon: "icon";
            children: "children";
            options: OptionsKey;
        },
    > = {
        id ?: keys.id;
        label ?: keys.label;
        fullLabel ?: keys.fullLabel;
        name ?: keys.name;
        type ?: keys.type;
        icon ?: keys.icon;
        children ?: keys.children;
        options ?: keys.options;
    };

    type CommmonItem<T, K, Payload> = {
        [x: K.id]: string;
        [x: K.label]: string | string[];
        [x: K.name]: string | undefined;
        [x: K.fullLabel]: string | string[];
        [x: K.type]: T;
        [x: K.children]: item["children"];
        [x: K.icon]: string | undefined;
        options?: Payload;
    }

    interface selected<T, Payload> {
        id: string;
        originalId ?: string;
        label : string;
        name : string | undefined;
        fullLabel ?: string;
        type : T;
        options: Payload;
        index: {
            all: (0 | number)[];
            current: 0 | number;
        };
        depth: number;

    }

    interface Main<T, K, Payload> {
        treeId ?: string;
        title ?: string;
        items ?: readonly Item<T, K, Payload>[];
        expands : readonly string[];
        keys ?: Keys<K>;
        selected ?: selected<T, K, Payload>;
        onSetExpands: (
            e? : React.MouseEvent<HTMLElement | HTMLButtonElement, MouseEvent>
        ) => (id: string | string[]) => void;
        onSetSelected: (params: selected<T, Payload>) => void;
        onBranchID: (params: TreeViewComponent.BranchID<T, K, Payload>) => string;
        onExpressLabel: (params: TreeViewComponent.Item<T, K, Payload>, full ?: boolean) => string;
        toolsActions ?: Record<string, (...args: any[]) => void>;
        insertId ?: Set<string>;
        initialize ?: {
            selected ?: {
                type ?: InitialSelection;
                compare ?: [any, string];
                expand ?: boolean;
            };
        };
        tools ?: {
            manageMenu ?: {
                delete ?: boolean;
                edit ?: boolean;
            };
        };
        setUp ?: {
            uniqueIdScope ?: UniqueIdScope;
            selectionFormat ?: SelectionFormat;
        };

    }

    interface Item<T, K, Payload> extends CommmonItem<T, K, Payload> {
        id: string;
        children?: Item<T, K, Payload>[];
        [x: string]: any;
    }

    interface BranchID<T, K, Payload> {
        depth: number;
        item: Item<T, K, Payload> | { [x: string]: any };
        allIndex: number[];
        uniqueIdScope: Main<T, K, Payload>["setUp"]["uniqueIdScope"];
    };

    interface TreeItem<T, K, Payload> extends Main<T, K, Payload>, CommmonItem<T, K, Payload> {
        id: string;
        originalId ?: string;
        label : string;
        children ?: item["children"];
        depth: 0 | number;
        [x : string]: any;
    }
}