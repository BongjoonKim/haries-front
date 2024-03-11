import {useRef, useState, useLayoutEffect, useCallback, useMemo, useEffect} from "react";
import {useTransition} from "react-spring";
import useDraggable from "../../../../hooks/sensor/useDraggable";
import useToggle from "../../../../hooks/state/useToggle";
import {ModeComponent} from "../../../../types/mode";
import {MouseEvent} from "react";

interface useModalBoxProps {
    visibleStatus?: boolean;
    showTimeCount?: number;
    size ?: ModeComponent.BoxSize;
    isModeless: boolean;
}

type BoxSize = {
    width : number;
    height : number;
    diff : {width : number; height : number}
}

type BoxPosition = { y : number; x: number }

function useModeBox({
    visibleStatus,
    showTimeCount,
    size,
  isModeless
} : useModalBoxProps) {
    const nextSize = useMemo(() => size, [size])
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

    const handleSetBoxPosition = useCallback(({width, height} : {width: number; height: number}) => {
        const { innerWidth, innerHeight } = window;
        if (
            innerWidth &&
            innerHeight &&
            height &&
            width &&
            !boxPosition.y &&
            !boxPosition.x
        ) {
            const adjustPosition = (showTimeCount || 0) * 20;
            const XPosition = innerWidth / 2 - width / 2 + adjustPosition;
            const YPosition = innerHeight / 2 - height / 2 + adjustPosition;
            setBoxPosition({
                x : XPosition < 0 ? 0 : XPosition,
                y : YPosition < 0 ? 0 : YPosition
            });
        }
    },[boxPosition, showTimeCount]);

    const handleSetBoxSize = useCallback(() => {
        if (boxRef.current && !boxSize.width && !boxSize.height) {
            const { clientWidth, clientHeight, children  } = boxRef.current;
            const width =
                (nextSize?.width && parseFloat(String(nextSize.width))) || clientWidth;
            const height =
                (nextSize?.height && parseFloat(String(nextSize.height))) || clientHeight;
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
            handleSetBoxPosition({width, height});
        }
    }, [boxRef.current, boxSize, nextSize, handleSetBoxPosition]);
    
    const handlePreventMouseDown = (event : MouseEvent<HTMLElement>) => {
        if (!isModeless && !String((event as Record<PropertyKey, any>)?.srcElement?.classList?.value).includes("mode-box")) {
            return false;
        }
    }

    const transitions = useTransition(visibleStatus, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    });
    
    // 의존성 제거해도 괜찮은지 확인 필요
    useEffect(handleSetBoxSize, []);
    
    useDraggable(
        { target : boxRef, control : isModeless ? dragControlRef : undefined },
        {dragStyle: "margin", maximize, onPreventMouseDown: handlePreventMouseDown },
    );

    return {
        boxRef, dragControlRef, minimize, setMinimize,
        boxSize, setBoxSize, boxPosition, transitions,
        resized, setResized, maximize, onMaximize
    }

}

export default useModeBox;