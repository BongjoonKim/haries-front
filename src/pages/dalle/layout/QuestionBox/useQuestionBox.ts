import {useCallback} from "react";

function useQuestionBox(props ?: any) {
  const handleEnter = useCallback(async (event : any) => {
    if (event.code === "Enter") {
    
    }
  }, []);
  
  return {
    handleEnter
  };
}

export default useQuestionBox;