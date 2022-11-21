import {useRecoilCallback, useRecoilState} from "recoil";
import { LayoutState} from "./LayoutState";
import {useCallback} from "react";

export const useLayout = () => {
    // 테마 컬러
    const [themeColor, setThemeColor] = useRecoilState(LayoutState.themeColor);

    // Aside 위치 상태
    const [asidePosition, setAsidePosition] = useRecoilState(LayoutState.asidePosition);

    // 사이드바 보임 여부 상태
    const [isAsideCollapsed, setIsAsideCollapsed] = useRecoilState(LayoutState.isAsideCollapsed);

    // 사이드바 전체 글로벌 로딩 상태
    const [globalLoading, setGlobalLoading] = useRecoilState(LayoutState.globalLoading);

    // 사이드바 보임 여부 토글
    const toggleIsAsideCollapsed = useRecoilCallback(({snapshot}) =>
        async () => {
            const currIsAsideCollapsed = await snapshot.getPromise(LayoutState.isAsideCollapsed)
            setIsAsideCollapsed(!currIsAsideCollapsed);
        }, [isAsideCollapsed]);

    return {
        themeColor,
        setThemeColor,
        asidePosition,
        setAsidePosition,
        isAsideCollapsed,
        setIsAsideCollapsed,
        toggleIsAsideCollapsed,
        globalLoading,
        setGlobalLoading
    }


}