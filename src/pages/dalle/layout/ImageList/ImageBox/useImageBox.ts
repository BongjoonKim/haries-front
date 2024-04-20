import {useCallback, useState} from "react";

function useImageBox() {
  const [selImg, setSelImg] = useState<any>({});
  const [hoverImg, setHoverImg] = useState<boolean>(false);
  
  const handleMouseEnter = useCallback((event : MouseEvent) => {
    console.log("마우스 진입", event.currentTarget);
    setHoverImg(true);
    return null;
  }, [selImg]);
  
  const handleMouseLeave = useCallback((event : MouseEvent) => {
    console.log("마우스 이탈", event.currentTarget)
    setHoverImg(false);
  }, [selImg]);
  
  return {
    handleMouseEnter,
    handleMouseLeave,
    hoverImg
  }
}

export default useImageBox;