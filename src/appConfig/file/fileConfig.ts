interface fileConfigProps {
  dirId : string | "new";
}

export default function fileConfig(props : fileConfigProps) {
  const REGION = `${process.env.REACT_APP_AWS_FILE_REGION}`;
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  
  const config = {
    bucketName: "haries-img",
    region: REGION,
    accessKeyId : ACCESS_KEY_ID,
    secretAccessKey : SECRET_ACCESS_KEY_ID,
    dirName: props.dirId ? props.dirId : "new"
  };
  
  return config;
}