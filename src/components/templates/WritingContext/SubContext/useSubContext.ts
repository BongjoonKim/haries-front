import {useCallback, MouseEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {s3Utils} from "../../../../utilities/s3Utils";
import {useRecoilValue} from "recoil";
import recoilDocumentState from "../../../../stores/recoil/recoilDocumentsState";

function useSubContext(props : any) {
  const [imgUrl, setImgUrl] = useState<any>([]);
  const thumbnailColor = useRecoilValue(recoilDocumentState.thumbnailColor);
  const navigate = useNavigate();
  
  const contentsOnClick = useCallback( ( event : MouseEvent<HTMLElement>) => {
    navigate(`${event.currentTarget.id}`)
  }, []);
  
  const getImg = useCallback(async () => {
    const imgUrls = [];
  
    for(const prop of props) {
      const responseList = await s3Utils.getFiles({prefix : prop.id});
      if (responseList && responseList.length) {
        imgUrls.push({
          id : prop.id,
          key : responseList[0]?.Key
        })
      } else {
        imgUrls.push({
          id : prop.id,
          key : "none"
        })
      }
    }
    setImgUrl([...imgUrls]);
  }, [props, imgUrl]);
  
  useEffect(() => {
    getImg();
  }, [props])
  
  return {
    contentsOnClick,
    imgUrl,
    thumbnailColor
  }
}

export default useSubContext;