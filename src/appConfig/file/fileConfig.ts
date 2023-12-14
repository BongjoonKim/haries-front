import S3 from "react-aws-s3-typescript";
import {useCallback} from "react";
import generatorUtil from "../../utilities/generatorUtil";

interface fileConfigProps {
  dirId ?: string | "new";
  blob : Blob,
  type ?: "upload" | "delete" | "find";
  location ?: "";
}

export default function fileConfig(props ?: fileConfigProps) {
  const REGION = `${process.env.REACT_APP_AWS_FILE_REGION}`;
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  
  const config = {
    bucketName: "haries-img",
    region: REGION,
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY_ID,
    dirName: props?.dirId ? props.dirId : "new"
  };
  
  const S3Client = new S3(config);
  
  // 파일 업로드
  const uploadFile = useCallback(() => {
    const file = new File([props!.blob!], generatorUtil.uuid(), {type:props!.blob.type});
    
    const formData = new FormData();
    formData.append("file", file);
    
    return props?.location ? props.location : "new";
  }, []);
  
  // 파일 조회
  const getAllFiles = useCallback(async() => {
    const response = await S3Client.listFiles();
    return response;
  }, []);
  
  // 파일 삭제
  const deleteFile = useCallback(async () => {
    const deleteResponse = await S3Client.deleteFile(props?.location ? props.location : "new/*");
    return deleteResponse;
  }, [])
  
  
  return { S3Client, uploadFile, getAllFiles, deleteFile};
}