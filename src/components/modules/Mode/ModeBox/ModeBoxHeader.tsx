import {Dispatch, SetStateAction, MutableRefObject} from "react";
import styled from "styled-components";
import Button from "../../../elements/Button/CustomButton";
import {ModeComponent} from "../../../../types/mode";
import { VscChromeClose, VscChromeMaximize} from "react-icons/vsc";
import {AiOutlineLine} from "react-icons/ai";
import {BiWindows} from "react-icons/bi";

interface ModeBoxHeaderProps<N> {
    onCloseMode: ModeComponent.handleCloseMode;
    setMinimize: Dispatch<SetStateAction<boolean>>;
    onAddTaskItem ?: ModeComponent.onAddTaskItem<N>;
    dragControlRef: MutableRefObject<HTMLHeadElement | null>;
    title?: string;
    maximize ?: boolean;
    onMaximize ?: () => void;
    uniqueKey: N | string;
    isActive: boolean;
}

function ModeBoxHeader<N>({
    onCloseMode,
    onAddTaskItem,
    dragControlRef,
    title,
    maximize,
    onMaximize,
    uniqueKey,
  isActive
} : ModeBoxHeaderProps<N>) {
    return (
    <StyledModeBoxHeader
        ref={dragControlRef}
        className="mode-box-header"
        isActive={isActive}
        onDoubleClick={e => {
            e?.preventDefault?.();
            e?.stopPropagation?.();
            onMaximize?.();
        }}
    >
        <div className="mode-box-header start">{title}</div>
        <div className="mode-box-header end">
            <Button
                className="clear"
                onClick={
                    () => onAddTaskItem?.({title: String(title || "Not Title"), key: uniqueKey})
                }
                styles={{padding : "5px"}}
                children={<AiOutlineLine size="15px" color="#333" />}
            />
            <Button
                className="clear"
                onClick={onMaximize}
                styles={{padding: "5px"}}
                children={
                    maximize ? (
                        <BiWindows size="15px" color="#333" />
                    ) : (
                        <VscChromeMaximize size="15px" color="#333" />
                    )
                }
            />
            <Button
                className="clear"
                onClick={() => onCloseMode()}
                styles={{ padding: "5px" }}
                children={<VscChromeClose size="15px" color="#333" />}
            />

        </div>
    </StyledModeBoxHeader>
    )
}

export default ModeBoxHeader;

const StyledModeBoxHeader = styled.header<{isActive : boolean}>`
  height: 40px;
  border-bottom: solid 1px #ddd;
  margin: 0 5px 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => !props.isActive ? "#ebebeb" : "#ebebeb"};
  .mode-box-header {
    &.start {
      font-weight: bold;
    }
    &.end {
      display: flex;
      flex-direction: row;
    }
  }
`;