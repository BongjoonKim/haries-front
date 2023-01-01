import {ModeComponent} from "../../../types/mode";
import styled from "styled-components";

interface ModeTaskBarProps<N> {
    taskItems : ModeComponent.ModeTaskItems<N>;
    onRemoveTaskItem: ModeComponent.onRemoveTaskItem<N>;
    onCloseMode: ModeComponent.onCloseMode<N>;
}

interface ModeTaskItemProps<N> {
    item: ModeComponent.ModeTaskItem<N>;
    onRemoveTaskItem: ModeComponent.onRemoveTaskItem<N>;
    onCloseMode: ModeComponent.onCloseMode<N>;
}

function ModeTaskItem<N>({
    item,
    onRemoveTaskItem,
}: ModeTaskItemProps<N>) {
    return(
        <StyledModeTaskItem
            role="button"
            className="mode-task-item"
            onClick={() => onRemoveTaskItem(item.key)}
        >
            {item.title}
        </StyledModeTaskItem>
    )
}

export default function ModeTaskBar<N>({
    taskItems,
    onRemoveTaskItem,
    onCloseMode,
}: ModeTaskBarProps<N>) {
    return (
        <StyledModeBar>
            {Object.keys(taskItems).map(key => (
                <ModeTaskItem<N>
                    key={key}
                    item={taskItems[key as keyof ModeComponent.ModeTaskItems<N>]}
                    onRemoveTaskItem={onRemoveTaskItem}
                    onCloseMode={onCloseMode}
                />
            ))}
        </StyledModeBar>
    )
}

const StyledModeTaskItem = styled.div`
  min-width: 100px;
  width: max-content;
  height: 30px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 11px;
  color: #888;
`;

const StyledModeBar = styled.div`
  pointer-events: auto;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 5px;
  left: 5px;
  .mode-task-time ~ .mode-task-item {
    margin-left: 3px;
  }`;