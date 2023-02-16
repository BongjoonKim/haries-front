import {SearchRounded} from "@material-ui/icons";
import {MailOutlineRounded} from "@material-ui/icons";
import {VpnKeyRounded} from "@material-ui/icons";
import styled from "styled-components";
import {Box, IconButton} from "@material-ui/core";
import {MouseEventHandler, useCallback, useRef, useState} from "react";
import Popper from "../../../../components/widgets/Popper";
import TextInput from "../../../../components/elements/TextInput";

function RightNavigator() {
  const [anchor, setAnchor] = useState<any>(null);
  const [arrowRef, setArrowRef] = useState<any>(null);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  
  //
  const openPopper = useCallback((event:any) => {
    setAnchor(event.currentTarget);
    openSearch ? setOpenSearch(false) : setOpenSearch(true);
    console.log("이벤트 확인", event)
  }, [openSearch]);
  
  return (
    <StyledRightHeader>
      {/*검색 창*/}
      <IconButton onClick={openPopper}>
        <SearchRounded style={{padding: 10}}/>
      </IconButton>
      <Popper
        className='search'
        placement="bottom"
        open={openSearch}
        disablePortal={false}
        modifier={{
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
          flip: {
            enabled: true,
          },
        }}
        anchorEl={anchor}
      >
        <Box>
          <TextInput
          />
          <span className="search" ref={setArrowRef}>여기</span>
        </Box>
      </Popper>
      
      <MailOutlineRounded />
      <VpnKeyRounded style={{padding: 10}}/>
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
    border: 200px;
    border-color: brown;
    color: brown;
  }
`;