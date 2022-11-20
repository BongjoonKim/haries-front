import {ConnectContent, ItemsProps, ReturnValue} from "./types";
import {useRef, useState} from "react";
import useClickOutside from "../../../hooks/sensor/useClickOutside";
import {KeyboardEvent} from "react";

export interface DialogProcessFieldProps<T> extends DispatchProps {
    ConnectContent: ConnectContent;
    returnName?: string;
    onCallback?: (values: ReturnValue) => unknown;
}

function useDialogProcessList({value, dispatch} : ItemsProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(-1);

    const setSelectedThenCloseDropdown = (index: number) => {
        setSelected(index);
        setIsOptionsOpen(false);
    }

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLLIElement>) => {
        switch (event.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                event.preventDefault();
                setSelectedThenCloseDropdown(index);
                break;
            default:
                break;
        }
    }

    const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement | HTMLButtonElement>) => {
        switch (event.key) {
            case "Escape":
                event.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                event.preventDefault();
                setSelected(selected - 1 >= 0 ? selected - 1: value.length - 1);
                break;
            case "ArrowDown":
                event.preventDefault();
                setSelected(selected === value.length - 1 ? 0 : selected + 1);
                break;
            default:
                break;
        }
    }

    const selectRef = useRef(null);

    useClickOutside(selectRef, () => setIsOptionsOpen(false));

    const getDialogProcessListProps = () => ({
        value, dispatch, isOptionsOpen, setIsOptionsOpen,
        selected, setSelected, onListKeyDown: handleListKeyDown,
        onKeyDown: handleKeyDown, setSelectedThenCloseDropdown
    });

    return {
        getDialogProcessListProps,
        selected,
        setSelected
    }
}

export default useDialogProcessList;