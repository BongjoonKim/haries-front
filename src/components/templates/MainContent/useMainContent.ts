import {SetterOrUpdater, useRecoilState} from "recoil";
import {LayoutState} from "../../../hooks/layout/LayoutState";

export interface UseMainContentHook {
    mainContentLoading: boolean;
    setMainContentLoading: SetterOrUpdater<boolean>;
    forwardData?: Record<PropertyKey, any>;
}

export const useMainContent = (id?: string) => {
    let retObj: UseMainContentHook | undefined = undefined;
    if (id) {
        const [mainContentLoading, setMainContentLoading] = useRecoilState(LayoutState.mainContentLoading(id))
        retObj = {
            mainContentLoading,
            setMainContentLoading
        }
    }
    return retObj;
}

export default useMainContent;