import useImageList from "./useImageList";
import styled from "styled-components";
import {DalleDTO} from "../../../../types/dto/DalleDTO";
import ImageBox from "./ImageBox";
import Carousel from "../../../../components/widgets/Carousel";

export interface ImageListProps {

}

function ImageList(props : ImageListProps) {
  
  const {
    images,
    getDalleList
  } = useImageList();
  
  return (

    <StyledImageList>
      <Carousel
        retrieve={getDalleList}
        data={images}
      />
    </StyledImageList>
  )
}

export default ImageList;

const StyledImageList = styled.div`
  margin: 2rem auto;
  display: flex;
  align-content: center;
`;