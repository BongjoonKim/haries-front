import {useCallback, useEffect, useState} from "react";
import {DalleDTO} from "../../../../types/dto/DalleDTO";
import {getDalleImages} from "../../../../endpoints/dalle-endpoints";

export default function useImageList() {
  const [images, setImages] = useState<DalleDTO[]>([]);
  const getDalleList = useCallback(async() => {
    const response = await getDalleImages();
    console.log("조회해온 값 확인", response)
    setImages(response.data);
  }, [images]);
  
  useEffect(() => {
    getDalleList();
  }, []);
  
  return {
    images
  }
}