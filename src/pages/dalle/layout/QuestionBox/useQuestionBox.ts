import {useCallback} from "react";
import { KeyboardEvent } from 'react';
import {askDalle, getDalleImages} from "../../../../endpoints/dalle-endpoints";

function useQuestionBox(props ?: any) {
  const handleEnter = useCallback(async (event : KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      const value = event.currentTarget.value;
      await askDalle({question : value})
    }
  }, []);
  
  return {
    handleEnter
  };
}

export default useQuestionBox;