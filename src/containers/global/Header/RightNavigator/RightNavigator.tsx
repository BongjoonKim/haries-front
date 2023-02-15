import {SearchRounded} from "@material-ui/icons";
import {MailOutlineRounded} from "@material-ui/icons";
import {VpnKeyRounded} from "@material-ui/icons";
import styled from "styled-components";
import {IconButton} from "@material-ui/core";
import {MouseEventHandler, useCallback, useState} from "react";
import Popper from "../../../../components/widgets/Popper";
import TextInput from "../../../../components/elements/TextInput";

function RightNavigator() {
  const [anchor, setAnchor] = useState<any>(null);
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
        placement="bottom"
        open={openSearch}
        anchorEl={anchor}
        
      >
        <TextInput
        />
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
`;