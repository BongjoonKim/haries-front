import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState} from "react";
import {RootState} from "../../stores";
import {portalActions} from "../../stores/actions/portal.action";

function useModal(props?: {local?: boolean}) {
    const dispatch = useDispatch();
    const [localStatus, setLocalStatus] = useState({id: "", options: {}});
    const globalStatus = useSelector<RootState, Modal.status>(state => state.portal.dialog);

    const handleChangeGlobalStatus = useCallback(
        (parameters: Modal.status) => {
            dispatch(
                portalActions.setDialogStatus({
                    id: parameters.id,
                    options: parameters.options || undefined
                })
            )
        }, [dispatch]
    )

    const handleChangeStatus = (parameters: Modal.status) => {
        if (props?.local) {
            setLocalStatus(prevState => ({...prevState, ...parameters}))
        } else {
            handleChangeGlobalStatus(parameters);
        }
    }

    const getModalProps = () => ({
        status: props?.local? localStatus : globalStatus,
        onChangeStatus: handleChangeStatus
    });

    return {
        getModalProps,
        status: props?.local ? localStatus : globalStatus,
        handleChangeStatus
    }
}

export default useModal;