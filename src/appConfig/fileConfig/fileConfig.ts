import AWS from "aws-sdk";
import S3 from "react-aws-s3-typescript";
import generatorUtil from "../../utilities/generatorUtil";

interface fileS3ConfigProps {
  blob : Blob,

  
}

export default async function fileS3Config(props : fileS3ConfigProps) {
  const REGION = "ap-northeast-2";
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  
  console.log("여기보세요", ACCESS_KEY_ID)
  const config = {
    bucketName: "haries-img",
    region: REGION,
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY_ID
  };
  
  const file = new File([props.blob], generatorUtil.uuid(), {type:props.blob.type})
  
  const S3Client = new S3(config);
  // 데이터 조회는 잘 됨
  const data = await S3Client.listFiles();
  console.log("데이터 확인", data);
  // const response = {location : ""};
  
  const formData = new FormData();
  formData.append("file", file);
  
  
  const response = await S3Client.uploadFile(file);
  console.log("리스폰스", response.location)
  
  return response.location;
}