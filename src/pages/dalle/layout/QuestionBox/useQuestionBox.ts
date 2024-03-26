import {useCallback} from "react";
import {getDalleImages} from "../../../../endpoints/dalle-endpoints";

function useQuestionBox(props ?: any) {
  const handleEnter = useCallback(async (event : any) => {
    if (event.code === "Enter") {
      await getDalleImages()
    }
  }, []);
  
  return {
    handleEnter
  };
}

export default useQuestionBox;