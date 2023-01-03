import {useCallback, useEffect, useState} from "react";
import {retrieveMainMenu} from "../../endpoints/common-endpoints";

function useExampleOne() {
  const [data, setData] = useState<any>("");
  console.log()
  const getData = useCallback(async () => {
    const aa = await retrieveMainMenu();
    setData(aa);
    console.log("aa", aa);
  }, [data]);
  
  useEffect(() => {
    getData();
  }, []);
  
  return data;
}

export default useExampleOne;