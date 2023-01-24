import {degree} from "../../../../components/modules/TreeView/constants";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import useClickOutside from "../../../../hooks/sensor/useClickOutside";

type depth = 0 | number;

export default function useNavigator() {
    const getInitialState = () => ({
        [degree[0]]: "",
        [degree[1]]: "",
        [degree[2]]: "",
        [degree[3]]: "",
    });

    const [status, setStatus] = useState<{[x in typeof degree[depth]]: string;}>(getInitialState());

    const clickRef: MutableRefObject<HTMLElement | null> = useRef(null);

    const handleResetStatus = () => {
        setStatus(getInitialState());
    }

    const handleSetStatus = (type: string, value: string) => {
        setStatus(prevState => ({...prevState, [type]: value}));
    }

    useClickOutside(clickRef as MutableRefObject<HTMLAreaElement | null>, handleResetStatus);

    const getNavigatorProps = () => ({
        status,
        onSetStatus: handleSetStatus,
        onResetStatus: handleResetStatus,
    })

    return {
        getNavigatorProps,
        clickRef
    }

}