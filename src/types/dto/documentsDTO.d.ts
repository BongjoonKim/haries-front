

declare namespace Documents {
  interface DocumentsInfo {
    totalContents : number;
    totalPages : number;
    documentsDTO : DocumentsDTO[];
  }

  
  interface DocumentsDTO {
    id ?: string;
    titles : string;
    htmlContents ?: any;
    created ?: Date | LocaleTime;
    initialUser ?: string;
  }
}

// interface DocumentsDTO {
//   titles : string;
//   htmlContents ?: any;
//   created ?: Date | LocaleTime;
//   initialUser ?: string;
// }

interface PaginationDTO {
  page : number;
  size : number;
}

interface PaginationInfoDTO extends PaginationDTO{
  totalCount : number;
  setPage : (page: number) => void;
}
