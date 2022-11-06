import {useRecoilState} from "recoil";
import { LayoutState} from "./LayoutState";
import {useCallback} from "react";

export const useLayout = () => {
    // 테마 컬러
    const [themeColor, setThemeColor] = useRecoilState(LayoutState.themeColor);

    // Aside 위치 상태
    const [asidePosition, setAsidePosition] = useRecoilState(LayoutState.asidePosition);

    // 사이드바 보임 여부 상태
    const [sidebarEnable, setSidebarEnable] = useRecoilState(LayoutState.sidebarEnable);

    // 사이드바 전체 글로벌 로딩 상태
    const [globalLoading, setGlobalLoading] = useRecoilState(LayoutState.globalLoading);

    // 사이드바 보임 여부 토글
    const toggleSidebarEnable = useCallback(() => {
        setSidebarEnable(!sidebarEnable);
    }, [sidebarEnable]);

    return {
        themeColor,
        setThemeColor,
        asidePosition,
        setAsidePosition,
        sidebarEnable,
        setSidebarEnable,
        toggleSidebarEnable,
        globalLoading,
        setGlobalLoading
    }


}