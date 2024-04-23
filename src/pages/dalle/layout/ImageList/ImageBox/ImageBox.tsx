import styled, {css} from "styled-components";
import {DalleDTO} from "../../../../../types/dto/DalleDTO";
import useImageBox from "./useImageBox";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {Dialog} from "@mui/material";
import ImageDetail from "./ImageDetail";
export interface ImageBoxProps extends DalleDTO {
  index ?: number;
  curInx ?: number;
  width ?: number;
  height ?: number;
  [x : string] : any;
}

export default function ImageBox(props : ImageBoxProps) {
  const {
    handleMouseEnter,
    handleMouseLeave,
    hoverImg,
    handleImgContent,
    imgInfo,
    handleModalClose,
    handleImgDelete
  } = useImageBox(props);
  console.log("props", props)
  return (
    <StyledImageBox
      imageInx={props.index}
      curInx={props.curInx}
      width={props.width}
      height={props.height}
      title={props.title}
      info={props.el}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={props.url}
      />
      {/*<StyledImgCover*/}
      {/*  width={props.width}*/}
      {/*  height={props.height}*/}
      {/*>*/}
      {/*  <div className="buttons">*/}
      {/*    <DownloadForOfflineOutlinedIcon />*/}
      {/*    <DescriptionOutlinedIcon />*/}
      {/*    <ImageOutlinedIcon />*/}
      {/*    <DeleteOutlineOutlinedIcon />*/}
      {/*  </div>*/}
      {/*</StyledImgCover>*/}
      {hoverImg ? (
        <>
          <StyledImgCover
            width={props.width}
            height={props.height}
          />
          <StyledImgContent
            width={props.width}
            height={props.height}
          >
            <div className="buttons">
              <DownloadForOfflineOutlinedIcon />
              <DescriptionOutlinedIcon
                onClick={handleImgContent}
              />
              <ImageOutlinedIcon />
              <DeleteOutlineOutlinedIcon
                onClick={handleImgDelete}
              />
            </div>
          </StyledImgContent>
        </>

      ) : (
        <></>
      )}
      <Dialog
        open={!!imgInfo.isOpen}
        onClose={handleModalClose}
      >
        <ImageDetail
          {...props}
        />
      </Dialog>
    </StyledImageBox>
  )
}

const StyledImageBox = styled.div<any>`
  min-width: ${(props : any) => (`${props.width}px` || "512px")};
  min-height: ${(props : any) => (`${props.height}px` || "512px")};
  margin: 0 16px;
  //max-width: 512px;
  //max-height: 512px;
  ${props => {
    if (props.imageInx === props.curInx + 1) {
      return css`
        //position: relative;
        //min-width: 600px;
        //min-height: 600px;
        //animation: 2s ease-in-out infinite alternate;
        //border: 1px solid black;
      `;
    } else {
      return css`
    
    `;
    }

  }}
  img {
    width: ${(props : any) => `${props.width}px` || "512px"};
    height: ${(props : any) => `${props.height}px` || "512px"};
    height: 100%;
    border-radius: 8px 8px;
    position: absolute;
  }
`;

const StyledImgCover = styled.div<any>`
  width: ${props => `${props.width}px` || "512px"};
  height: ${props => `${props.height}px` || "512px"};
  background: gray;
  position: absolute;
  opacity: 0.6;
`;

const StyledImgContent = styled.div<any>`
  width: ${props => `${props.width}px` || "512px"};
  height: ${props => `${props.height}px` || "512px"};
  background: none;
  position: absolute;
  .buttons {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    gap : 0.5rem;
    svg {
      font-size: 60px;
      opacity: 1 !important;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;