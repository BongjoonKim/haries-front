import S3 from "react-aws-s3-typescript";
import {useCallback} from "react";
import generatorUtil from "../../utilities/generatorUtil";
import {useRecoilState} from "recoil";
import recoilDocumentState from "../../stores/recoil/recoilDocumentsState";
import fileConfig, {fileConfigProps} from "./fileConfig";
import AWS from "aws-sdk";



export default function fileProcesses(props ?: fileConfigProps) {
  const S3Client = fileConfig(props);
  
  const REGION = `${process.env.REACT_APP_AWS_FILE_REGION}`;
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  const IDENTITY_POOL = `${process.env.REACT_APP_AWS_IDENTITY_POOL}`;
  const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:IDENTITY_POOL});
  
  const myConfig = new AWS.Config({
    credentials :myCredentials,
    region : REGION
  });
  AWS.config.credentials
  
  
  // 파일 업로드
  const uploadFile = async () => {
    const file = new File([props!.blob!], generatorUtil.uuid(), {type:props!.blob!.type});
    if (props?.dirName === "new") {
      props.setUploadedList((prev : any[]) => [...prev, props.blob]);
    }
    const response = await S3Client.uploadFile(file);
    return response.location;
  };
  
  // 파일 조회
  const getAllFiles = async() => {
    const response = await S3Client.listFiles();
    return response;
  }
  
  // 파일 삭제
  const deleteFile = async () => {
    const deleteResponse = await S3Client.deleteFile(props?.location ? props.location : "new/*");
    return deleteResponse;
  };
  
  
  return { S3Client, uploadFile, getAllFiles, deleteFile};
}