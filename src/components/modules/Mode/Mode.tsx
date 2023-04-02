import {ModeComponent, ModeContent} from "../../../types/mode";
import {useMemo} from "react";
import {ModeTypes} from "./router/generate";
import MemoGeneralize from "../../renderers/MemoGeneralize";
import styled from "styled-components";
import converter from "../../../utilities/converter";
import ModeBox from "./ModeBox/ModeBox";
import ModeOverlay from "./ModeOverlay";
import ModeTaskBar from "./ModeTaskBar";
import useMode from "./useMode";

function Mode<T, N>({
    type, name, id, title,
    onCloseMode, taskItems,
    onAddTaskItem, onRemoveTaskItem,
    onActiveSequenceMode, activeSequence,
    size, showTimeCount, children,
    dependent,overlayClose, onVisibleStatus,
    isActiveEffect, onActiveEffect, top, left
} : ModeComponent.ModeProps<T, N>) {
    const {
        uniqueKey, visibleStatus, activeSequenceIndex,
        handleCloseMode, handleActiveSequenceMode,
      isModeless, isActive
    } = useMode({
        type, name, id, onCloseMode, onActiveSequenceMode, activeSequence,
        onVisibleStatus, isActiveEffect, onActiveEffect
    });
    
    return (
        <ModeWrapper
            tabIndex={-1}
            className={converter.classNames([
                "mode",
                isModeless ? "modeless" : "modal",
            ])}
            activeSequenceIndex={activeSequenceIndex}
            dependent={dependent}
            onMouseDown={event => {
                event?.stopPropagation?.();
                handleActiveSequenceMode?.(uniqueKey);
            }}
            top={top}
            left={left}
        >
            {!isModeless && (
                <ModeOverlay<T, N> type={type} visibleStatus={visibleStatus} overlayClose={overlayClose} onCloseMode={handleCloseMode} />
            )}
            <ModeBox<T, N>
                type={type}
                title={title}
                visibleStatus={visibleStatus}
                onCloseMode={handleCloseMode}
                onAddTaskItem={onAddTaskItem}
                onActiveSequenceMode={onActiveSequenceMode}
                taskItems={taskItems}
                showTimeCount={showTimeCount}
                dependent={dependent}
                size={size}
                uniqueKey={uniqueKey}
                isModeless={isModeless}
                isActive={isActive}
            >
                {children}
            </ModeBox>
            {isModeless && taskItems && onRemoveTaskItem && (
                <ModeTaskBar
                    taskItems={taskItems}
                    onRemoveTaskItem={onRemoveTaskItem}
                    onCloseMode={handleCloseMode}
                />
            )}
        </ModeWrapper>
    );
}

const ModeWrapper = styled.div<{
    activeSequenceIndex?: number;
    dependent?: boolean;
    top?: string;
    left?: string;
}>`
  pointer-events: none;
  transition-duration: 0.5s;
  text-align: initial;
  //z-index: ${props => props.activeSequenceIndex};
  z-index: 10000;
  position: ${props => (!props.dependent ? "initial" : "initial")};
  &.modeless {
    width: 0;
    height: 0;
    position: ${props => (props.top || props.left) ? "absolute" : "relative"};
    top: ${props => props.top ? props.top : "auto"};
    left : ${props => props.left ? props.left : "auto"};
  }
  &.modal {
    width: 100%;
    height: 100%;
  }
  .mode {
    &-overlay {
      width: 100%;
      height: 100%;
      position: ${props => (!props.dependent ? "fixed" : "absolute")};
    }
    &-header {
      font-size: 20px;
      font-weight: normal;
    }
    &-body {
      max-height: 500px;
      overflow-y: auto;
    }
  }
`;

export default MemoGeneralize(Mode);