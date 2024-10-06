import {Search, SearchRounded} from "@material-ui/icons";
import {MailOutlineRounded} from "@material-ui/icons";
import {VpnKeyRounded} from "@material-ui/icons";
import styled from "styled-components";
import {Box, colors, IconButton} from "@material-ui/core";
import {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import TextInput from "../../../../components/elements/TextInput";
import useClickOutside from "../../../../hooks/sensor/useClickOutside";
import useMode from "../../../../hooks/ui/useMode";
import {Dialog} from "../../../../components/modules/Mode";
import {ModeTypes} from "../../../../components/modules/Mode";
import GlobalModeNames from "../../../../constants/modes/global-mode.const";
import {dialogConstants} from "../../../../constants/modal/dialog.const";
import ExampleTwo from "../../../../pages/examples/ExampleTwo";
import useModal from "../../../../hooks/ui/useModal";
import LoginPage from "../../../../pages/Login";
import exampleTwo from "../../../../pages/examples/ExampleTwo";
import SearchIcon from '@mui/icons-material/Search';
import {ClickAwayListener, Grow, InputBase, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useRecoilState, useRecoilValue} from "recoil";
import recoilCommonState from "../../../../stores/recoil/recoilCommonState";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CustomButton from "../../../../components/elements/Button";
import useRightNavigator from "./useRightNavigator";

function RightNavigator() {
  const [anchorSearch, setAnchorSearch] = useState<any>(null);
  const arrowRef = useRef<any>(null);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode} = useMode();
  const isLogin = useRecoilValue<boolean>(recoilCommonState.isLogin);
  const [isShow, setShow] = useState(false);
  const {
    menuRef,
    menuOpen,
    setMenuOpen,
    loginUser,
    handleClose,
    handleListKeyDown,
    doLogout,
    goBlog,
    goChatGPT,
  } = useRightNavigator();
  
  // 글쓰기
  const navigate = useNavigate();
  // 검색 Popper
  const openSearchPopper = useCallback((event:any) => {
    setAnchorSearch(event.currentTarget);
    openSearch ? setOpenSearch(false) : setOpenSearch(true);
  }, [openSearch,anchorSearch]);
  
  // 로그인 Modeless
  const openLoginModal = useCallback((event: any) => {
    handleShowMode("login-modal");
  }, []);
  
  
  
  useEffect(() => {
    if(localStorage.getItem("authorization")) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);
  
  // 로그인 이벤트 발생 시
  useEffect(() => {
    if(isLogin) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isLogin]);
  
  return (
    <StyledRightHeader>
      {isShow && (
        <CustomButton className={"pc"} onClick={() => navigate(`/blog/writing`)}>
          Create
        </CustomButton>
      )}
      
      {/*검색 창*/}
      {/*<StyledSearch>*/}
      {/*  <StyledIconWrapper>*/}
      {/*    <SearchIcon />*/}
      {/*  </StyledIconWrapper>*/}
      {/*  <StyledInputBase*/}
      {/*    placeholder="Search…"*/}
      {/*    inputProps={{ 'aria-label': 'search' }}*/}
      {/*  />*/}
      {/*</StyledSearch>*/}
      
      {/*이메일*/}
      {/*<IconButton onClick={() => handleShowMode("ask")}>*/}
      {/*  <MailOutlineRounded />*/}
      {/*</IconButton>*/}
      {/*<Dialog*/}
      {/*  type={ModeTypes.MODELESS}*/}
      {/*  name="ask"*/}
      {/*  title="Q&A"*/}
      {/*  top="10%"*/}
      {/*  left="70%"*/}
      {/*  children={exampleTwo()}*/}
      {/*  {...getLocalModeProps()}*/}
      {/*/>*/}
      
      {/*로그인*/}
      <IconButton disableRipple ref={menuRef} onClick={() => {setMenuOpen(prev => !prev)}}>
        <AccountCircleOutlinedIcon/>
      </IconButton>

      <Dialog
        type={ModeTypes.MODAL}
        name="login-modal"
        children={LoginPage()}
        {...getLocalModeProps()}
        overlayClose={false}
        // onVisibleStatus={() => {
        //   return false;
        // }}
      />
      <Popper
        open={menuOpen}
        anchorEl={menuRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={menuOpen}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {loginUser?.userId ? (
                    <div className="menu-list">
                      <div className={"mobile"}>
                        <MenuItem onClick={goBlog}>Blog</MenuItem>
                        <MenuItem onClick={() => navigate(`/blog/writing`)}>Create</MenuItem>
                        <MenuItem onClick={goChatGPT}>ChatGPT</MenuItem>
                      </div>
                      <MenuItem onClick={doLogout}>Logout</MenuItem>
                    </div>

                  ) : (
                    <div className="menu-list">
                      <div className={"mobile"}>
                        <MenuItem onClick={goBlog}>Blog</MenuItem>
                        <MenuItem onClick={() => navigate(`/blog/writing`)}>Create</MenuItem>
                      </div>
                      <MenuItem onClick={openLoginModal}>Login</MenuItem>
                    </div>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </StyledRightHeader>
  )
}

export default RightNavigator;

const StyledRightHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-family: sans-serif;
  letter-spacing: -0.05rem;
  display: flex;
  align-items: center;
  padding-right: 1rem;
  background-color: white;
  .mobile {
    display: none;
  }
  .pc {
    display: block;
  }
  @media screen and (max-width: 500px) {
    .mobile {
      display: block;
    }
    .pc {
      display: none;
    }
  }
`;

const StyledSearch = styled.div`
  position: relative;
  display: flex;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  height: 80%;
  background-color: white !important;
  &:hover {
    background-color: #eee !important;
  }
  margin-left: 0;
`;

const StyledIconWrapper = styled.div`
  padding: 0rem 1rem;
  //padding-left: 2rem;
  display: flex;
  align-items: center;
`;

const StyledInputBase = styled(InputBase)<{theme : any}>`
  color: inherit;
  width: 10rem;
  &.MuiInputBase-input {
    padding: 1rem 1rem;
    
  }
`;