import {Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import MemoGeneralize from "../../../renderers/MemoGeneralize";
import {MdOutlineSouthEast} from "react-icons/md";

type TargetSize = {
    width: number;
    height : number;
    diff : { width: number; height: number };
};

interface ModeResizerProps {
    size : TargetSize;
    setSize: Dispatch<SetStateAction<TargetSize>>;
    resized: boolean;
    setResized: Dispatch<SetStateAction<boolean>>
}

function ModeResizer({
    size, setSize, resized, setResized
}: ModeResizerProps) {
    const handleResizer = (e: {
        preventDefault(): unknown;
        stopPropagation(): unknown;
        pageX: number;
        pageY: number;
    }) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const startSize = size;
        const startPosition = {x : e.pageX, y: e.pageY};

        function onMouseMove(mouseMoveEvent: {pageX:number; pageY:number}) {
            if (!resized) setResized(true);
            setSize(prevState => ({
                ...prevState,
                width : startSize.width - startPosition.x + mouseMoveEvent.pageX,
                height : startSize.height - startPosition.y + mouseMoveEvent.pageY
            }));
        }

        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    return (
      <StyledMoveResizer onMouseDown={handleResizer}>
          <MdOutlineSouthEast />
      </StyledMoveResizer>
    )
}

export default ModeResizer;

const StyledMoveResizer = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0;
  bottom: 1rem;
  cursor: se-resize;
  
`;