import styled from "styled-components";
import {DialogProcessListProps} from "./types";

function DialogProcessList({
    value,
    onListKeyDown,
    selected,
    setSelectedThenCloseDropdown,
    onKeyDown
}: DialogProcessListProps) {
    return (
        <StyledDialogProcessContainer>
            <StyledDialogProcessList
                role="listbox"
                aria-activedescendant={value[selected]}
                tabIndex={-1}
                onKeyDown={onListKeyDown}
            >
                {value.map((item: DialogProcessListProps["value"], index: number) => (
                    <StyledDialogProcessItem
                        key={String(item.id || item.value)}
                        id={String(item.id || item.value)}
                        role="option"
                        aria-selected={selected === index}
                        tabIndex={0}
                        onKeyDown={onKeyDown(index)}
                        onClick={() => setSelectedThenCloseDropdown(index)}
                    >
                        {item.label}
                    </StyledDialogProcessItem>
                ))}
            </StyledDialogProcessList>
        </StyledDialogProcessContainer>
    )
}

export default DialogProcessList;

const StyledDialogProcessList = styled.ul`
    width: 100%;
`;

const StyledDialogProcessItem = styled.li<{"aria-selected" ?: boolean }>`
    width: 100%;
  padding: 5px;
  background-color: ${props => (props["aria-selected"] ? "#ec008d" : "transparent")};
  color: ${props => (props["aria-selected"] ? "#fff" : "444")};
  box-sizing: border-box;
`;

const StyledDialogProcessContainer = styled.div`
  display: flex;
  flex: 1;
  max-height: 100px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 27.84px;
  height: fit-content;
`;