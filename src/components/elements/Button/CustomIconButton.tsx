import styled from "styled-components";
import {ButtonProps, IconButton} from "@mui/material";

interface IconButtonProps extends ButtonProps{

}

function CustomIconButton(props : IconButtonProps) {
  return (
    <StyledIconButton
      {...props}
    >
      {props.children}
    </StyledIconButton>
  )
}

export default CustomIconButton;

const StyledIconButton = styled(IconButton)`
`;