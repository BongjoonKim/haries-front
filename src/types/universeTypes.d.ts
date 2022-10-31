interface FrontUsersVO {
    userId ?: string;
    userNameEng ?: string;
    userNameKor ?: string;
    departmentCode ?: string;
    departmentDesc ?: string;
    userLocale ?: string;
}

interface UserAuthVO {
    authHeaderName ?: string;
    token ?: string;
    frontUsersVO ?: FrontUsersVO;
}