import awsS3 from "../appConfig/file/awsS3";

export const s3Utils = {
  async getFile(props : any) {
    const S3 = awsS3();
    S3.getObject({
      Bucket : "haries-img",
      Key : props.fileKey
    })
  },
  
  async getFiles(props : any) {
    const S3 = awsS3();
    const response = await S3.listObjects({
      Bucket : "haries-img",
      Prefix : props.prefix
    });
    return response.promise().then(el => el.Contents)
  },
  
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
      CopySource: `haries-img/${props.fileKey}`, // 원본 버킷/키
      Key: `${props.newFileKey}`, // 대상 버킷/키
    }
    const response = await S3.copyObject(params);
    return response.promise().then(el => el.CopyObjectResult);
  },
  
  async deleteFile(props : any) {
    const S3 = awsS3();
    const params = {
      Bucket: "haries-img",
      Key: `haries-img/${props.fileKey}`, // 원본 버킷/키
    }
    const response = await S3.deleteObject(params);
    return response;
  },
  
  async deleteFiles(props : any) {
    const S3 = awsS3();
    const params = {
      Bucket : "haries-img",
      Delete: {
        Objects : props.Keys
      },
    }
    const response = await S3.deleteObjects(params, (error, data) => {
    });
    return response.promise().then(el => el.$response);
  }
}