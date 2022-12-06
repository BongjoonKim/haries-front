import {SetterOrUpdater, useRecoilState} from "recoil";
import {LayoutState} from "../../../hooks/layout/LayoutState";

export interface UseSectionHook {
    sectionLoading: boolean;
    setSectionLoading: SetterOrUpdater<boolean>;
}

export const useSection = (id?: string) => {
    let retObj: UseSectionHook | undefined;

    const [sectionLoading, setSectionLoading] = useRecoilState(LayoutState.sectionLoading(id!));
    retObj = {
        sectionLoading,
        setSectionLoading
    }

    return retObj;
}