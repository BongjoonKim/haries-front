import {AlertProps} from "@mui/material";
import {AlertColor} from "@mui/material/Alert/Alert";
import {AxiosResponse} from "axios";

export const MESSAGE_STATUS = "messageStatus";
export const IS_LOGIN = 'loginEvent';

export const ACCESS_TOKEN = "accessToken";
export const LOGIN_USER_DATA = "loginUserData";
export const LOGIN_ROLES = "loginRoles"
export const MODAL_STATE = "modalState";

export const ERROR_INFO = "errorInfo";

declare interface ERROR_INFO_TYPE  {
  isOpen ?: boolean;
  severity ?: AlertColor
  statusText ?: string;
  status ?: number;
  data ?: {}
}