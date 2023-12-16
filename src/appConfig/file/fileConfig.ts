import {useRecoilState} from "recoil";
import recoilDocumentState from "../../stores/recoil/recoilDocumentsState";
import S3 from "react-aws-s3-typescript";

export interface fileConfigProps {
  dirName ?: string | "new";
  blob ?: Blob,
  type ?: "upload" | "delete" | "find";
  location ?: "";
  uploadedList ?: any[];
  setUploadedList ?: any;
  
}
function fileConfig(props ?: fileConfigProps) {
  const REGION = `${process.env.REACT_APP_AWS_FILE_REGION}`;
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  
  const config = {
    bucketName: "haries-img",
    region: REGION,
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY_ID,
    dirName: props?.dirName ? props.dirName : "new"
  };
  
  const S3Client = new S3(config);
  
  return S3Client;
}

export default fileConfig;