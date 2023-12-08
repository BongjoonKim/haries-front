// import AWS from "aws-sdk";
// import {S3Client, PutObjectCommand, S3} from "@aws-sdk/client-s3";
import S3 from "react-aws-s3-typescript";
import generatorUtil from "../../../utilities/generatorUtil";
import fileConfig from "../fileConfig";

interface fileS3ConfigProps {
  blob : Blob,
  type ?: "upload" | "delete" | "find";
  dirId ?: string | "new"
  
}

export default async function fileUpload(props : fileS3ConfigProps) {
  const { S3Client } = fileConfig({dirId : props.dirId});
  
  const file = new File([props.blob], generatorUtil.uuid(), {type:props.blob.type})
  
  const deletes = await S3Client.deleteFile(
    "new/1n7raUYvuzEfCSVWEsQKdP.598bd3d9-7474-9c1a-9500-31cbc3be97d")
  
  const formData = new FormData();
  formData.append("file", file);
  
  const response = {location : ""};
  // const response = await S3Client.uploadFile(file);
  // console.log("리스폰스", response.location)
  
  return response?.location ? response?.location : "";
}