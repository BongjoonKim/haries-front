import {recoilPersist} from "recoil-persist";
import {atom, selector} from "recoil";

export const USER_STATE_GRP_CD = "userState";

const localUserState = recoilPersist({
    key : USER_STATE_GRP_CD,
    storage : window.localStorage
});

const sessionUserState = recoilPersist({
    key : USER_STATE_GRP_CD,
    storage : window.sessionStorage
});

// 사용자 state
export const UserState = {
    // 저장된 사용자 아이디 state
    rememberUserId : atom<string>({
        key : `${USER_STATE_GRP_CD}/rememberUserId`,
        default : '',
        effects_UNSTABLE : [localUserState.persistAtom]
    }),
    // 사용자 인증 정보 state
    userAuth : atom<UserAuthVO>({
        key : `${USER_STATE_GRP_CD}/userAuth`,
        default : {},
        effects_UNSTABLE : [sessionUserState.persistAtom]
    }),
    // 사용자 로그인 여부 Selector
    isLogin : selector<boolean>({
        key : `${USER_STATE_GRP_CD}/isLogin`,
        get : ({get}) => {
            const userAuth : UserAuthVO = get(UserState.userAuth);
            return !!userAuth.token;
        }
    }),
    // 사용자 locale Selector
    userLocale : selector<string | undefined>({
        key : `${USER_STATE_GRP_CD}/userLocale`,
        get : ({get}) => {
            const userAuth : UserAuthVO = get(UserState.userAuth);
            return userAuth.frontUsersVO?.userLocale;
        },
        set : ({get, set}, locale) => {
            const userAuth : UserAuthVO = get(UserState.userAuth);
            set(UserState.userAuth, {
                ...userAuth,
                frontUsersVO : {
                    ...userAuth.frontUsersVO,
                    userLocale: locale as string
                }
            })
        }
    }),
    // 사용자 인증 정보 Selector
    userVO : selector<FrontUsersVO | undefined>({
        key : `${USER_STATE_GRP_CD}/userVO`,
        get : ({get}) => {
            const userAuth : UserAuthVO = get(UserState.userAuth);
            return userAuth.frontUsersVO;
        },
        set : ({get, set}, frontUsersVO) => {
            const userAuth : UserAuthVO = get(UserState.userAuth);
            set(UserState.userAuth, {
                ...userAuth,
                frontUsersVO : {
                    ...frontUsersVO
                }
            })
        }
    })
}

export default UserState;



