import {TreeViewComponent} from "../type";
import {useNavigate} from "react-router-dom";
import {useSpring} from "react-spring";
import {useCallback, useEffect} from "react";
import {InitialSelection} from "../constants";

function useTreeItem<T, K, P>(
    props: TreeViewComponent.TreeItem<T, K, P>
) {
    const navigate = useNavigate();
    const expandStatus = props.expands?.includes(props.id) && !!props.children;
    const springs = useSpring({
        opacity: expandStatus ? 1 : 0,
        maxHeight: expandStatus ? "max-content" : 0,
    });

    const handleBranchSelected = useCallback(
        (props: TreeViewComponent.TreeItem<T, K, P>) => {
            if (props.type === "root") return;
            const options : P & any = {};
            props.keys?.options?.forEach((key: string) => {
                options[key as keyof P] = props.item[key];
            });
            props.onSetSelected?.({
                id: props.id,
                originalId: props.originalId,
                label: props.label,
                fullLabel: props.fullLabel,
                name: props.name,
                type: props.type,
                options : options as P,
                index : {
                    all : props.allIndex,
                    current: props.index
                },
                depth: props.depth
            });
            if (props.initialize?.selected?.expand)
                props.onSetExpands()([...props.allParentId, props.id]);
            if (options.component) navigate(options.component);
        }, [navigate]
    );

    const handleInitialSelected = () => {
        if (
            props.initialize?.selected?.type === InitialSelection.COMPARE &&
            props.initialSelected === props.initialize?.selected?.compare?.[0]
        ) {
            handleBranchSelected(props);
        }
    }

    useEffect(
        handleInitialSelected, []
    );

    return {
        expandStatus,
        springs,
        handleBranchSelected
    };

}

export default useTreeItem;