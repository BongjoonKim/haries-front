import awsS3 from "./awsS3";

function fileProcess(props : any) {
  const S3 = awsS3();
  
  const uploadFile = async () => {
    const file = new File([props.blob], `${props.fileName}`, {type:props.blob.type});
    const response = await S3.upload({
      Bucket : "haries-img",
      Key : "fileKey",
      Body : file
    });
    
    return response.promise().then(el => el.Location)
  }
  
  return {
    uploadFile
  }
}

export default fileProcess;