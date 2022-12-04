import {createElement, JSXElementConstructor, ReactElement} from "react";
import Dialog from "../frame/Dialog";

export type Schema =
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactElement<any, string | JSXElementConstructor<any>>[];

export enum ModeTypes {
    MODAL = "MODAL",
    MODELESS = "MODELESS",
    MODAL_CONFIRM = "MODAL_CONFIRM"
}

export default function generate<T, N>(
    { schema, action } : GenerateParams<Schema, ModeTypes>,
    initialValue : GenerateState<GenerateType<Schema>>
) {
    const {
        status,
        onCloseMode,
        onShowMode,
        taskItems,
        onAddTaskItem,
        onRemoveTaskItem,
        onActiveSequenceMode,
        activeSequence,
        onShowDependentMode,
        onCloseDependentMode,
        onVisibleStatus
    } = action.payload;

    return  (Array.isArray(schema) ? schema : new Array(schema))?.map(
        (item : ReactElement<any, string | JSXElementConstructor<any>>) => {
            const { component, type, name, title } = item.props;
            const list = initialValue;
            const commonProps = {
                dialog : {
                    key : name,
                    type,
                    name,
                    status,
                    onCloseMode,
                    onShowMode,
                    onCloseDependentMode,
                    onVisibleStatus
                },
                component : {
                    key: name,
                    mode: {
                        type,
                        name,
                        status,
                        statusItem: status[name],
                        onCloseMode: (name ?: N, id?: string) =>
                        onCloseMode((typeof name === "string" && name) || item.props.name, id),
                        onShowMode,
                        onShowDependentMode,
                        onCloseDependentMode
                    },
                    ...status?.[name]?.props
                }
            };

            switch (type) {
                case ModeTypes.MODAL:
                    return list.concat(
                        createElement(
                            Dialog,
                            {
                                id: name,
                                ...commonProps.dialog,
                                ...status?.[name]?.options
                            },
                            createElement(component, {
                                key: name,
                                ...commonProps.component,
                                ...status?.[name]?.props
                            })
                        )
                    );
                case ModeTypes.MODELESS:
                    const newModeElementProps = {
                      title,
                      ...commonProps.dialog,
                      taskItems,
                      onAddTaskItem,
                      onRemoveTaskItem,
                      onActiveSequenceMode,
                      activeSequence
                    };
                    return list.concat(
                        createElement(
                            Dialog,
                            {
                                id: name,
                                ...commonProps.dialog,
                                ...status?.[name]?.options
                            },
                            createElement(component, {
                                key: name,
                                ...commonProps.component,
                                ...status?.[name]?.props
                            })
                        )
                    )
                default:
                    return list;
            }
        }
    )

}