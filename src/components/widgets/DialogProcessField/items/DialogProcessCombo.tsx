import {DialogProcessItems} from "../types";
import {useEffect, useRef, useState} from "react";
import {KeyboardEvent} from "react";
import useClickOutside from "../../../../hooks/sensor/useClickOutside";
import styled from "styled-components";
import {isBoolean} from "util";
import converter from "../../../../utilities/converter";

function DialogProcessSelect(props: DialogProcessItems.DialogProcessComboBoxProps) {
    const viewRef = useRef(null);
    const [options, setOptions] = useState<DialogProcessItems.DialogProcessComboBoxProps["options"]>(
        props.options
    );
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [targetOption, setTargetOption] = useState<{
        selected: number;
        current: number;
    }>({
        selected: 0,
        current: 0
    });

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    }

    const setSelectedThenCloseDropdown = (index: number) => {
        setTargetOption(prevState => ({
            ...prevState,
            selected: index,
        }));
        setIsOptionsOpen(false);
    }

    const handleListKeyDown = (
        event: KeyboardEvent<HTMLDivElement | HTMLUListElement | HTMLLIElement | HTMLButtonElement>
    ) => {
        switch (event.key) {
            case "SpaceBar":
                setIsOptionsOpen(prevState => !prevState);
                break;
            case "Enter":
                event.preventDefault();
                setSelectedThenCloseDropdown(targetOption.current);
                break;
            case "Escape":
                event.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                event.preventDefault();
                setTargetOption(prevState => ({
                    ...prevState,
                    current: targetOption.current - 1 >= 0
                        ? targetOption.current - 1
                        : options.length - 1
                }))
                break;
            case "ArrowDown":
                event.preventDefault();
                setTargetOption(prevState => ({
                    ...prevState,
                    current: targetOption.current === options.length - 1
                        ? 0
                        : targetOption.current + 1
                }))
                break;
            default:
                break;
        }
    }

    useClickOutside(viewRef, () => setIsOptionsOpen(false), isOptionsOpen);
    useEffect(() => setOptions(props.options), [props.options]);

    return (
        <SelectWrapper>
            <StyledView
                ref={viewRef}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={isOptionsOpen}
                onClick={toggleOptions}
                onKeyDown={handleListKeyDown}
                className={converter.classNames(["select-view", isOptionsOpen && "expanded"])}
            >
                {options[targetOption.selected].label}
            </StyledView>
            <StyledList
                className={converter.classNames(["options", isOptionsOpen && "visible"])}
                role="listbox"
                aria-activedescendant={String(
                    options[targetOption.selected]?.id || options[targetOption.selected].value
                )}
                tabIndex={-1}
                onKeyDown={handleListKeyDown}
            >
                {options.map((option, index) => (
                    <StyledDialogProcessItem
                        key={String(option.id || option.value)}
                        id={String(option.id || option.value)}
                        role="option"
                        aria-current={targetOption.current === index}
                        aria-selected={targetOption.selected === index}
                        onMouseOver={() =>
                            setTargetOption(prevState => ({
                                ...prevState,
                                current: index
                            }))
                        }
                        tabIndex={0}
                        onClick={() => setSelectedThenCloseDropdown(index)}
                    >
                        {option.label}
                    </StyledDialogProcessItem>
                ))}
            </StyledList>
        </SelectWrapper>
    )
}

export default DialogProcessSelect;

const StyledDialogProcessItem = styled.li<{
    "aria-selected"?: boolean;
    "aria-current"?: boolean;
}>`
  padding: 6px 10px;
  cursor: pointer;
  background-color: ${props => (props["aria-selected"] ? "#666" : "transparent")};
  color: ${props => (props["aria-selected"] ? "#fff" : "000")};
  &:active,
  &:focus,
  &[aria-current="true"] {
    background: #ccc;
    color: #000;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 300px;
`;

const StyledView = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex: 1;
  padding: 0 10px;
  position: relative;
  align-items: center;
  &::after {
    position: absolute;
    right: 6px;
    top: 4px;
    content: "\\2191";
  }
  &.expanded::after {
    content:"\\2193";
  }
`;

const StyledList = styled.ul`
  position: absolute;
  top: 35px;
  width: inherit;
  z-index: 10;
  background-color: #fff;
  &.options {
    border: 1px solid #ccc;
    display: none;
    list-style: none;
    padding: 4px 0;
    margin-top: -4px;
  }
  &.visible {
    display: block;
  }
`;