import {ChangeEvent, useCallback, useState} from "react";
import { KeyboardEvent } from 'react';
import {askDalle, getDalleImages} from "../../../../endpoints/dalle-endpoints";
import {useRecoilState} from "recoil";
import recoilDocumentState from "../../../../stores/recoil/recoilDocumentsState";

function useQuestionBox(props ?: any) {
  const [writing, setWriting] = useState<string | undefined>("");
  const [isLoading, setLoading] = useRecoilState<boolean>(recoilDocumentState.isLoading);
  
  const handleChange = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setWriting(value);
  }, [writing]);
  
  const handleEnter = useCallback(async (event : KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      const value = event.currentTarget.value;
      setLoading(true);
      await askDalle({question : value});
      setWriting("")
      setLoading(false);
    }
  }, [writing, isLoading]);
  
  return {
    writing,
    handleChange,
    handleEnter,
    isLoading
  };
}

export default useQuestionBox;