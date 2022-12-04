import { useRef, useState, useLayoutEffect } from "react";
import {useTransition} from "react-spring";
import useDraggable from "../../../../hooks/sensor/useDraggable";
import useToggle from "../../../../hooks/state/useToggle";
import {ModeComponent} from "../../../../types/mode";

interface useModalBoxProps<N> {
    visibleStatus?: boolean;
    showTimeCount?: number;
    size ?: ModeComponent.BoxSize;
}

type BoxSize = {
    width : number;
    height : number;
    diff : {width : number; height : number}
}

type BoxPosition = { y : number; x: number }

function useModeBox<N>({
    visibleStatus,
    showTimeCount,
    size
} : useModalBoxProps<N>) {
    const boxRef = useRef(null);
    const dragControlRef = useRef(null);

    const [maximize, onMaximize] = useToggle();
    const [minimize, setMinimize] = useState<boolean>(false);
    const [resized, setResized] = useState<boolean>(false);
    const [boxSize, setBoxSize] = useState<BoxSize>({
        width : 0,
        height : 0,
        diff : { width : 0, height : 0 },
    });
    const [boxPosition, setBoxPosition] = useState<BoxPosition>({
        x: 0, y: 0
    });

    const handleSetBoxPosition = () => {
        const { innerWidth, innerHeight } = window;
        const { width, height } = boxSize;
        if (
            innerWidth &&
            innerHeight &&
            height &&
            width &&
            !boxPosition.y &&
            !boxPosition.x
        ) {
            const adjustPosition = (showTimeCount || 0) * 20;
            setBoxPosition({
                x : innerWidth / 2 - width / 2 + adjustPosition,
                y : innerHeight / 2 - height / 2 + adjustPosition
            });
        }
    };

    const handleSetBoxSize = () => {
        if (boxRef.current && !boxSize.width && !boxSize.height) {
            const { clientWidth, clientHeight, children  } = boxRef.current;
            const width =
                (size?.width && parseFloat(String(size.width))) || clientWidth;
            const height =
                (size?.height && parseFloat(String(size.height))) || clientHeight;
            let { diff } = boxSize;
            if (children?.[1]) {
                const { clientWidth : bodyClientWidth, clientHeight: bodyClientHeight } = children[1];
                diff = {
                    width: width - bodyClientWidth,
                    height: height - bodyClientHeight,
                };
            }
            setBoxSize({
                width,
                height,
                diff
            });
        }
    };

    const transitions = useTransition(visibleStatus, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    });

    useLayoutEffect(handleSetBoxPosition, [boxPosition, boxSize, showTimeCount]);
    useLayoutEffect(handleSetBoxSize, [boxRef, boxSize, visibleStatus, size]);
    useDraggable(
        { target : boxRef, control : dragControlRef },
        {dragStyle: "margin", maximize },
    );

    return {
        boxRef, dragControlRef, minimize, setMinimize,
        boxSize, setBoxSize, boxPosition, transitions,
        resized, setResized, maximize, onMaximize
    }

}

export default useModeBox;