import {useCallback, useState} from "react";
import {ImageBoxProps} from "./ImageBox";
import {cloneDeep} from "lodash";

interface ImgInfoProps {
  isOpen : boolean;
  id ?: string;
  question ?: string;
  desc ?: string;
}

function useImageBox(props : ImageBoxProps) {
  const [selImg, setSelImg] = useState<any>({});
  const [hoverImg, setHoverImg] = useState<boolean>(false);
  const [imgInfo, setImgInfo] = useState<ImgInfoProps>({isOpen : false});
  
  const handleMouseEnter = useCallback((event : MouseEvent) => {
    console.log("마우스 진입", event.currentTarget);
    setHoverImg(true);
    return null;
  }, [selImg]);
  
  const handleMouseLeave = useCallback((event : MouseEvent) => {
    console.log("마우스 이탈", event.currentTarget)
    setHoverImg(false);
  }, [selImg]);
  
  // 이미지 설명
  const handleImgContent = useCallback(() => {
    setImgInfo({
      isOpen : true,
      id : props.id,
      question : props.question,
      desc : props.description
    })
  }, [props]);
  
  const handleModalClose = useCallback(() => {
    setImgInfo((prev : ImgInfoProps) => {
      const data = cloneDeep(prev);
      data.isOpen = false;
      return data;
    })
  }, [imgInfo]);
  
  const handleImgDelete = useCallback(async () => {
  
  }, []);
  
  return {
    imgInfo,
    
    handleMouseEnter,
    handleMouseLeave,
    hoverImg,
    handleImgContent,
    handleModalClose,
    handleImgDelete
  }
}

export default useImageBox;