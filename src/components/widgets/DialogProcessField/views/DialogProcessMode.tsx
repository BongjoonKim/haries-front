import {DialogProcessModeType, DialogProcessViews, DialogProcessViewType} from "../types";
import {Dialog, ModePortal, ModeTypes} from "../../../modules/Mode";
import generatorUtil from "../../../../utilities/generatorUtil";

function DialogProcessModeItem({
    getModeProps, name, type, content,
    onSubmit, value, onClose,
    size, title
}: DialogProcessViews.ModeItemProps) {
    return (
        <Dialog
            {...getModeProps()}
            type={type || ModeTypes.MODAL}
            name={name}
            size={size}
            title={title}
            children={generatorUtil.toCreateElement(content, {
                onSubmit,
                onClose,
                value
            })}
        />
    );
}

function DialogProcessMode({
    onSubmit,
    value,
    getModeProps,
    onCloseMode,
    size,
    ...props
}: DialogProcessViews.ModeContainerProps) {
    return (
        <ModePortal>
            {props.ConnectContent && (
                <DialogProcessModeItem
                    getModeProps={getModeProps}
                    type={ModeTypes.MODAL}
                    name={DialogProcessModeType.DIALOG_PROCESS_FIELD}
                    content={props.ConnectContent}
                    onSubmit={onSubmit({mode: true})}
                    value={value}
                    onClose={() => onCloseMode(DialogProcessModeType.DIALOG_PROCESS_FIELD)}
                    size={size}
                />
            )}
            {props.contentMaps?.map((item: DialogProcessViews.ContentMap, index) => {
                const modeName = generatorUtil.flagWithID(
                    DialogProcessModeType.DIALOG_PROCESS_FIELD,
                    String(index)
                );
                return (
                    <DialogProcessModeItem
                        getModeProps={getModeProps}
                        type={item.action?.type || DialogProcessViewType.MODAL}
                        name={modeName}
                        content={item.action?.component}
                        onSubmit={onSubmit({ flag: String(index), mode: true})}
                        value={value}
                        onClose={() => onCloseMode(modeName)}
                        size={item.action.options?.size}
                        title={item.action.options?.title}
                    />
                )
            })}
        </ModePortal>
    )
}

export default DialogProcessMode;