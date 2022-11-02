import {ModeComponent, ModeContent} from "../../../types/mode";
import {useMemo} from "react";
import {ModeTypes} from "./router/generate";
import styled from "styled-components";

function Mode<T, N>({
    type,
    name,
    title,
    status,
    onCloseMode,
    taskItems,
    onAddTaskItem,
    onRemoveTaskItem,
    onActiveSequenceMode,
    activeSequence,
    size,
    showTimeCount,
    children,
    dependent,
} : ModeComponent.ModeProps<T, N>) {
    const activeIndex = useMemo(() => {
        const initialActiveIndex : number = String(type)?.includes(ModeTypes.MODAL) ? 9998 : 9899
        if (activeSequence?.includes(name))
            return initialActiveIndex - (activeSequence?.indexOf(name) || 0);
        return initialActiveIndex;
    }, [activeSequence, name, type]);

    const handleClose = () => onCloseMode?.(name);

    const handleActiveSequenceMode = (name:N) => {
        if (String(type)?.includes(ModeTypes.MODELESS) && activeSequence?.indexOf(name) !== 0) {
            onActiveSequenceMode?.(name)
        }
    };

    return (
        <ModeWrapper>

        </ModeWrapper>
    )
}

const ModeWapper = styled.div<{
    activeIndex?: number;
    dependent?: boolean;
    active?: boolean;
}>`
  display: ${props => (props.active ? "block" : "none")};
  transition-duration: 0.5s;
  text-align: initial;
  z-index: ${props => props.activeIndex};
  position: ${props => (!props.dependent ? "fixed" : "initial")};
  &.modeless {
    width: 0;
    height: 0;
    position: relative;
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
      top : 0;
      left : 0;
    }
    &-close-button {
      position: absolute;
      top: -20px;
      right: 0;
    }
    &-header {
      font-size: 20px;
      font-weight: normal;
    }
    &-body {
      max-height: 500px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        position: absolute;
      }
      ::-webkit-scrollbar-button:start:decrement,
      ::-webkit-scrollbar-button:end:increment {
        display: block;
        width: 0;
        height: 0;
        background: url() rgba(0, 0, 0, 0.05);
      }
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.07);
        border-radius: 15px;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 15px;
      }
    }
  }
`;

export default MemoGeneralize(Mode);