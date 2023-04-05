interface DocumentsDTO {
  titles : string;
  htmlContents ?: any;
  created ?: Date | LocaleTime;
  initialUser ?: string;
}

interface PaginationDTO {
  page : number;
  size : number;
}

interface PaginationInfoDTO extends PaginationDTO{
  totalCount : number;
  setPage : (page: number) => void;
}
