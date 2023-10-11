export interface ChannelDTO {
  id ?: string;
  name ?: string;
  created ?: Date;
  modified ? : Date;
  authorities : [];
  lastestMessage : string;
  
}