import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../stores";
import {useCallback} from "react";
import {portalActions} from "../../stores/actions/portal.action";

function usePopup() {
    const dispatch = useDispatch();

    const status = useSelector<RootState, Popup.status>(state => state.portal.popup);

    const handleAddStatus = useCallback((parameter: Popup.statusParams) => {
        dispatch(
            portalActions.addPopupStatus({
                id: parameter.id,
                options: parameter.options || undefined
            })
        )
    }, [dispatch]);

    const handleRemoveStatus = useCallback((parameter: Popup.statusParams) => {
        dispatch(
            portalActions.removePopupStatus({
                id: parameter.id
            })
        )
    }, [dispatch]);

    const getPopupProps = () => ({
        status,
        onAddStatus: handleAddStatus,
        onRemoveStatus: handleRemoveStatus
    })

    return {
        getPopupProps,
        status,
        handleAddStatus,
        handleRemoveStatus
    }
}

export default usePopup;