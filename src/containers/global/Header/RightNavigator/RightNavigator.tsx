import {SearchRounded} from "@material-ui/icons";
import {MailOutlineRounded} from "@material-ui/icons";
import {VpnKeyRounded} from "@material-ui/icons";
import styled from "styled-components";
import {Box, colors, IconButton} from "@material-ui/core";
import {MouseEventHandler, useCallback, useRef, useState} from "react";
import Popper from "../../../../components/widgets/Popper";
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

function RightNavigator() {
  const [anchorSearch, setAnchorSearch] = useState<any>(null);
  const arrowRef = useRef<any>(null);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode} = useMode();
  
  
  // 검색 Popper
  const openSearchPopper = useCallback((event:any) => {
    setAnchorSearch(event.currentTarget);
    openSearch ? setOpenSearch(false) : setOpenSearch(true);
  }, [openSearch,anchorSearch]);
  
  // 로그인 Modeless
  const openLoginModal = useCallback((event: any) => {
    handleShowMode("login-modal");
  }, []);
  
  // 개발자 문의 모달
  const openAskModeless = useCallback((event: any) => {
  
  }, []);
  
  return (
    <StyledRightHeader>
      {/*검색 창*/}
      <IconButton onClick={openSearchPopper}>
        <SearchRounded/>
      </IconButton>
      <Popper
        className='search'
        placement="bottom"
        open={openSearch}
        disablePortal={true}
        anchorEl={anchorSearch}
        modifier={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'viewport',
              padding: 8,
            }
          },
          arrow: {
            enabled: true,
            options: {
              element : arrowRef
            }
          },
          flip: {
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'viewport',
              padding: 8,
            },
          },
        }}
      >
          <TextInput
            className="text-input"
            width="200px"
            min-height="300px"
          >
            <SearchRounded />
          </TextInput>
      </Popper>
      
      {/*이메일*/}
      <IconButton onClick={() => handleShowMode("ask")}>
        <MailOutlineRounded />
      </IconButton>
      <Dialog
        type={ModeTypes.MODELESS}
        name="ask"
        title="Q&A"
        top="10%"
        left="70%"
        children={exampleTwo()}
        {...getLocalModeProps()}
      />
      
      {/*로그인*/}
      <IconButton onClick={openLoginModal}>
        <VpnKeyRounded/>
      </IconButton>
      <Dialog
        type={ModeTypes.MODAL}
        name="login-modal"
        children={LoginPage()}
        {...getLocalModeProps()}
        overlayClose={false}
        onRemoveTaskItem={handleCloseMode}
      />
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
  padding-right: 50px;
  .search {
    background-color: beige;
    z-index: 1000 !important;
    .text-input {
      z-index: 10;
    }
  }

`;