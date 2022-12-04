import {ModeComponent} from "../../../types/mode";
import {animated, useTransition} from "react-spring";
import styled from "styled-components";

function ModeOverlay<T, N>({
    type,
    visibleStatus,
    onCloseMode,
    overlayClose
} : ModeComponent.ModeOverlayProps<T, N>) {
    const transitions = useTransition(visibleStatus, {
        from : {opacity: 0},
        enter : {opacity: 1},
        leave : {opacity: 0},
    });

    const handleCloseMode = () => {
        if (typeof overlayClose === "boolean" && overlayClose) onCloseMode();
    }

    return transitions(
        ({ opacity }, item) =>
            item && (
                <animated.div
                    onClick={handleCloseMode}
                    style={{
                        opacity : opacity.to({ range : [0.0, 1.0], output: [0, 1]}),
                    }}
                >
                    <StyleModeOverlay className="mode-overlay" data-type={type} />
                </animated.div>
            )
        )
}

export default ModeOverlay;

const StyleModeOverlay = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
  z-index: 9998;
  pointer-events: auto;
`;