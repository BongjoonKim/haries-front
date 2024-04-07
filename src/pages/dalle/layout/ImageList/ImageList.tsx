import useImageList from "./useImageList";
import styled from "styled-components";
import {DalleDTO} from "../../../../types/dto/DalleDTO";
import ImageBox from "./ImageBox";
import Carousel from "../../../../components/widgets/Carousel";

export interface ImageListProps {

}

function ImageList(props : ImageListProps) {
  
  const {
    images
  } = useImageList();
  
  return (

    <StyledImageList>
      <Carousel
        data={images}
      />
      {/*{images?.map((image : DalleDTO) => {*/}
      {/*  return (*/}
      {/*    <ImageBox {...image} />*/}
      {/*  )*/}
      {/*})}*/}
    </StyledImageList>
  )
}

export default ImageList;

const StyledImageList = styled.div`
  margin: 2rem 2rem;
  display: flex;
  //justify-content: center;
  align-content: center;
  width: 100%;
  //overflow-x: auto;
`;