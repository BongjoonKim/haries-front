import {EditorType} from "@toast-ui/editor";
import {FilterDataDTO} from "./filterDataDTO";

interface DocumentsInfo {
  totalContents : number;
  totalPages : number;
  documentsDTO : DocumentDTO[];
}


interface DocumentDTO {
  id ?: string;
  title : string;
  contents : string;
  contentsType ?: EditorType ;
  disclose ?: boolean;
  tags ?: [];
  created ?: Date | string;
  modified ?: Date | string;
  initialUser ?: string;
  modifiedUser ?: string;
  unique ?: string;
  folderId ?: string;
}

interface PaginationDTO {
  page : number;
  size : number;
  folderId ?: string;
}

interface PaginationInfoDTO extends PaginationDTO{
  totalCount : number;
  setPage : (page: number) => void;
}
