import {atom, atomFamily} from "recoil";
import {recoilPersist} from "recoil-persist";

// 상태 코드
export const LAYOUT_STATE_GROUP = "layoutState";

//  테마 컬러 타입
export type ThemeColor = 'light' | 'dark';

// Aside 위치 타입
export type AsidePosition = 'left' | 'right';

// 레이아웃 로컬 스토리지 상태 저장 객체
const localLayoutState = recoilPersist({
    key : LAYOUT_STATE_GROUP,
    storage: window.localStorage
});

export const LayoutState = {
    // 테마 컬러
    themeColor: atom<ThemeColor>({
        key: `${LAYOUT_STATE_GROUP}/themeColor`,
        default: 'light',
        effects_UNSTABLE: [localLayoutState.persistAtom]
    }),

    // 사이드바 위치
    asidePosition: atom<AsidePosition>({
        key: `${LAYOUT_STATE_GROUP}/asidePosition`,
        default: 'left',
        effects_UNSTABLE: [localLayoutState.persistAtom]
    }),

    // 사이드바 보임 여부 state
    sidebarEnable: atom<boolean>({
        key: `${LAYOUT_STATE_GROUP}/sidebarEnable`,
        default: true
    }),

    //사이트 전체 글로벌 로딩 상태
    globalLoading: atom<boolean>({
        key: `key: ${LAYOUT_STATE_GROUP}/globalLoading`,
        default: false
    }),

    // 메인 컨텐츠 로딩 상태
    mainContentLoading: atomFamily<boolean, string>({
        key: `${LAYOUT_STATE_GROUP}/mainContentLoading`,
        default: false
    }),

    // 메인 컨텐츠 섹션 로딩 상태
    sectionLoading: atomFamily<boolean, string>({
        key: `${LAYOUT_STATE_GROUP}/sectionLoading`,
        default: false
    })
}