
export interface FoldersDTO {
  id ?: string;
  uniqueKey ?: string;
  label ?: string;
  depth ?: number;
  path ?: string;
  parentId ?: string;
  childrenId ?: string[];
  type ?: string;
  show ?: boolean;
  expand ?: boolean;
  created ?: Date;
  modified ?: Date;
  creator ?: string;
  modifier ?: string;
  children ?: FoldersDTO[];
}