// import AWS from "aws-sdk";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
// import S3 from "react-aws-s3-typescript";
import generatorUtil from "../../utilities/generatorUtil";

interface fileS3ConfigProps {
  blob : Blob,
  documentId ?: string | "new";
  type ?: "upload" | "delete" | "find";
  
}

export default async function fileS3Config(props : fileS3ConfigProps) {
  const REGION = "ap-northeast-2";
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  
  const client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY_ID,
  });
  const file = new File([props.blob], generatorUtil.uuid(), {type:props.blob.type})
  const params = {
    Bucket: "haries-img",
    Key: '/haries',
    Body: file,
  };
  
  const command = new PutObjectCommand(params);
  const response = await client.send(command);
  
  console.log("response", response)
  
  // const config = {
  //   bucketName: "haries-img",
  //   region: REGION,
  //   accessKeyId : ACCESS_KEY_ID,
  //   secretAccessKey : SECRET_ACCESS_KEY_ID,
  //   dirName: props.documentId ? props.documentId : "new"
  // };
  //
  // const file = new File([props.blob], generatorUtil.uuid(), {type:props.blob.type})
  //
  // const S3Client = new S3(config);
  // // 데이터 조회는 잘 됨
  // const data = await S3Client.listFiles();
  // console.log("데이터 확인", data);
  //
  // const formData = new FormData();
  // formData.append("file", file);
  //
  //
  // const response = await S3Client.uploadFile(file, "ㅇㅇㅇㅇ");
  // console.log("리스폰스", response.location)
  
  return response.;
}