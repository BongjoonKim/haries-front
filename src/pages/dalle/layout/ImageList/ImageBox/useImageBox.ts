import {useCallback, useState} from "react";

function useImageBox() {
  const [selImg, setSelImg] = useState<any>({});
  
  const handleMouseEnter = useCallback((event : MouseEvent) => {
    console.log("마우스 정보 확인", event.currentTarget)
    return null;
  }, [selImg]);
  
  const handleMouseLeave = useCallback((event : MouseEvent) => {
  
  }, [selImg]);
  
  return {
    handleMouseEnter,
    handleMouseLeave
  }
}

export default useImageBox;