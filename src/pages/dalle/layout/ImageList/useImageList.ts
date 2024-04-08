import {useCallback, useEffect, useState} from "react";
import {DalleDTO} from "../../../../types/dto/DalleDTO";
import {getDalleImages} from "../../../../endpoints/dalle-endpoints";
import {useRecoilValue} from "recoil";
import recoilDocumentsState from "../../../../stores/recoil/recoilDocumentsState";

export default function useImageList() {
  const [images, setImages] = useState<DalleDTO[]>([]);
  const isLoading = useRecoilValue<boolean>(recoilDocumentsState.isLoading);
  
  const getDalleList = useCallback(async() => {
    const response = await getDalleImages();
    setImages(response.data);
  }, [images]);
  
  useEffect(() => {
    if (!isLoading) {
      getDalleList();
    }
  }, [isLoading]);
  
  return {
    images
  }
}