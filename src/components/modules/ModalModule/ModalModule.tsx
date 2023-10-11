import {Modal, Box} from "@mui/material";

// MUI 기반의 모달 모듈입니다.
function ModalModule(props : any) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      sx={{zIndex : 20000}}
    >
      <Box
        style={{
          position : "absolute",
          top : "50%",
          left : "50%",
          transform: 'translate(-50%, -50%)',
          width: 400,
          borderRadius: '12px',
          padding: '16px 32px 24px 32px',
          background: "white"
        }}
      >
        {props.children}
      </Box>
    </Modal>
  )
}

export default ModalModule;
