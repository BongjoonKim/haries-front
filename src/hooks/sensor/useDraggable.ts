import {useEffect, useState, useCallback, MutableRefObject} from "react";
import {MouseEvent} from "react";

interface useDraggableRefProps {
    target : MutableRefObject<any>;
    control ?: MutableRefObject<any>;
}

interface useDraggableOptionsProps {
    dragStyle ?: "translate" | "margin";
    maximize ?: boolean;
    onPreventMouseDown ?: (event: MouseEvent<HTMLElement>) => unknown;
}

function useDraggable(
    ref : useDraggableRefProps,
    options ?: useDraggableOptionsProps
) {
    const [{dx, dy}, setOffSet] = useState<{ dx : number; dy: number}>({
        dx : 0,
        dy : 0
    });

    const handleMouseDown = useCallback((event : MouseEvent<HTMLElement>) => {
        if (options?.onPreventMouseDown?.(event) === false) return false;
        const startX = event.pageX - dx;
        const startY = event.pageY - dy;

        const handleMouseMove = (event : {
            preventDefault() : unknown;
            stopPropagation() : unknown;
            pageX : number;
            pageY : number;
        }) => {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            const newDx = event.pageX - startX;
            const newDy = event.pageY - startY;
            setOffSet({ dx : newDx, dy : newDy });
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener(
            "mouseup",
            () => document.removeEventListener("mousemove", handleMouseMove),
            { once : true },
        );
    }, [dx, dy]);

    useEffect(() => {
        const el = ref.control || ref.target;
        el.current?.addEventListener("mousedown", handleMouseDown);
        return () => {
            el?.current?.removeEventListener("mousedown", handleMouseDown);
        };
    }, [dx, dy, ref, handleMouseDown]);

    useEffect(() => {
        if (ref.target.current) {
            const nextDy = options?.maximize ? 0 : dy;
            const nextDx = options?.maximize ? 0 : dx;
            const nextTransform = options?.maximize ? "initial" : `translate3d(${dx}px, ${dy}px, 0)`;

            if (options?.dragStyle !== "margin" ) {
                ref.target.current.style.transform = nextTransform;
            } else {
                ref.target.current.style.marginTop = `${nextDy}px`;
                ref.target.current.style.marginLeft = `${nextDx}px`;
            }
        }
    }, [dx, dy, ref.target, options?.dragStyle, options?.maximize]);
}

export default useDraggable;