
export interface MessageHistoryDTO {
  id ?: string;
  channelId : string;
  content : string;
  userId ?: string;
  created ?: Date;
  bot?: string;
  
}