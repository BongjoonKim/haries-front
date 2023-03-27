type messageItem = {
    text : string;
    visible : boolean;
    status ?: string;
}

declare namespace Loader {
    type status = {
        visible : boolean;
        message ?: string;
    }
}

declare namespace Modal {
    type status = {
        id : string;
        options ?: {
            [x : string] : any;
        }
    };

    type onChangeStatus = (params : status) => void;

    type boxSize = {
        width ?: number | string;
        height ?: number | string;
        minWidth ?: number | string;
        minHeight ?: number | string;
        maxWidth ?: number | string;
        maxHeight ?: number | string;
    }
}

declare namespace Popup {
    type status = {
        [x : string] : {
            id : string;
            options ?: {
                [x : PropertyKey] : any;
            };
        };
    };

    type statusParams = {
        id : string;
        options ?: {
            [x: PropertyKey] : any;
        };
    };

    type onAddStatus = (params : statusParams) => void;
    type onRemoveStatus = (params : statusParams) => void;

    type boxSize = {
        width ?: number | string;
        height ?: number | string;
    };
}

type ReturnType<T extends (...args : any ) => any> = T extends  (...args : any ) => infer R ? R : any;

declare namespace Select {
    type Option<T extends Record<string, any> = {value: string & number; label: string}> = T;
    type selected<T = Option> = SingleValue<T> | MultiValue<T>;
    type onChange<T = Option> = (newValue: selected, actionMeta: ActionMeta<T>) => void;
    type ActionsMeta<T = Option> = ActionMeta<T>
}

declare namespace Kanban {
    type Status = "todo" | "doing"
    
    type Item = {
        id : string;
        status : Status;
        titles : string;
        contents : string;
        index : number;
    }
    
    type Items = {
        [key in Status] : Item[];
    }
}