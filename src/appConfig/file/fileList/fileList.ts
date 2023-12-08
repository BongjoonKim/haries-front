import fileConfig from "../fileConfig";

function fileList() {
  const {S3Client} = fileConfig();
  const allFiles = await S3Client.listFiles();
  return {
    allFiles
  }
}

export default fileList;