import AWS from "aws-sdk";
import {reject} from "lodash";

export default function awsS3() {
  const REGION = `${process.env.REACT_APP_AWS_FILE_REGION}`;
  const ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`!;
  const SECRET_ACCESS_KEY_ID = `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID}`!;
  const IDENTITY_POOL = `${process.env.REACT_APP_AWS_IDENTITY_POOL}`;
  const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:IDENTITY_POOL});
  
  const myConfig = new AWS.Config({
    credentials : {
      accessKeyId : ACCESS_KEY_ID,
      secretAccessKey : SECRET_ACCESS_KEY_ID,
    },
    region : REGION
  });
  const result = new AWS.S3(myConfig)
  return result;
}