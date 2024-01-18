import {useCallback, MouseEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {s3Utils} from "../../../../utilities/s3Utils";

function useSubContext(props : any) {
  const [imgUrl, setImgUrl] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const contentsOnClick = useCallback( ( event : MouseEvent<HTMLElement>) => {
    navigate(`${event.currentTarget.id}`)
  }, []);
  
  const getImg = useCallback(async () => {
    for(const prop of props) {
      
      const responseList = await s3Utils.getFiles({prefix : prop.id});
      setImgUrl(responseList!);
      console.log("responseList", responseList)
  
    }
  }, [props.id, imgUrl]);
  
  useEffect(() => {
    getImg();
  }, [props])
  
  return {
    contentsOnClick,
    imgUrl
  }
}

export default useSubContext;