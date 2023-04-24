import {EditorType} from "@toast-ui/editor";

interface DocumentsInfo {
  totalContents : number;
  totalPages : number;
  documentsDTO : DocumentDTO[];
}


interface DocumentDTO {
  id ?: string;
  titles : string;
  contents ?: string;
  contentsType ?: EditorType ;
  created ?: Date | string;
  initialUser ?: string;
  modified ?: Date | string;
  modifiedUser ?: string;
}

interface PaginationDTO {
  page : number;
  size : number;
}

interface PaginationInfoDTO extends PaginationDTO{
  totalCount : number;
  setPage : (page: number) => void;
}
