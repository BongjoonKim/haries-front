import {CSSProperties, useCallback, useState} from "react";

function usePopover(props: {
    initialize?: boolean;
    children: React.ReactNode;
    containerStyle?: CSSProperties | undefined;
}) {
    const [visible, setVisible] = useState<boolean>(!!props.initialize || false);
    const handleVisible = useCallback((status?: boolean) => {
        setVisible(prevState => {
            if (typeof status !== "undefined") return status;
            return !prevState;
        })
    }, []);

    const getPopoverProps =() => ({
        visible,
        onVisible: handleVisible,
        children: props.children,
        containerStyle: props.containerStyle,
    });

    return {
        getPopoverProps
    }
}

export default usePopover;