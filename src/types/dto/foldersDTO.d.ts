import {int} from "aws-sdk/clients/datapipeline";

interface FoldersDTO {
  id : string;
  uniqueKey : string;
  label : string;
  depth : int;
  path : string;
  parentId : string;
  childrenId : string[];
  type : string;
  show : boolean;
  expand : boolean;
  created : Date;
  modified : Date;
  creator : string;
  mofifier : string;
  children : FoldersDTO[];
}