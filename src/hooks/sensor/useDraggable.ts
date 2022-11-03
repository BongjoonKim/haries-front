import {useEffect, useState, useCallback, MutableRefObject} from "react";

interface useDraggableRefProps {
    target : MutableRefObject<any>;
    control ?: MutableRefObject<any>;
}

interface useDraggableOptionsProps {
    dragStyle ?: "translate" | "margin";
    maximize ?: boolean;
}

function useDraggable(
    ref : useDraggableRefProps,
    options ?: useDraggableOptionsProps
) {
    const [{dx, dy}, setOffSet] = useState<{ dx : number; dy: number}>({
        dx : 0,
        dy : 0
    });

    const handleMouseDown = useCallback((e : { pageX: number; pageY: number }) => {
        const startX = e.pageX - dx;
        const startY = e.pageY - dy;

        const handleMouseMove = (e : {
            preventDefault() : unknown;
            stopPropagation() : unknown;
            pageX : number;
            pageY : number;
        }) => {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            const newDx = e.pageX - startX;
            const newDy = e.pageY - startY;
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