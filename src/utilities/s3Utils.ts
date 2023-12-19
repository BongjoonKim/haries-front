import awsS3 from "../appConfig/file/awsS3";

export const s3Utils = {
  async uploadFile(props : any) {
    const S3 = awsS3();
    const response = await S3.upload({
      Bucket : "haries-img",
      Key : props.fileKey,
      Body : props.file,
    })
    
    return response.promise().then(el => el.Location)
  },
  
  async copyFile(props : any) {
    const S3 = awsS3();
    const params = {
      Bucket: "haries-img",
      CopySource: props.fileKey, // 원본 버킷/키
      Key: props.newFileKey, // 대상 버킷/키
    }
    const response = await S3.copyObject(params);
    return response.promise().then(el => el.$response);
  },
  
  async deleteFile(props : any) {
    const S3 = awsS3();
    const params = {
      Bucket: "haries-img",
      Key: props.fileName, // 원본 버킷/키
    }
  }
}