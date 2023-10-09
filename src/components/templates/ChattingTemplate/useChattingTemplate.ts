import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {
  createChannel,
  createMessage,
  deleteChannel,
  getChannels,
  getMessages
} from "../../../endpoints/chatting-endpoints";
import {MessageHistoryDTO} from "../../../types/dto/messageHistoryDTO";
import {askChatGPT} from "../../../endpoints/chatgpt-endpoints";

function useChattingTemplate() {
  const [isChannelModal, setIsChannelModal] = useState<boolean>(false);
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [channelList, setChannelList] = useState<any[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<MessageHistoryDTO[]>([]);
  
  // 새로운 채널 생성
  const createNewChannel = useCallback(async () => {
    try {
      await createChannel({channelName : newChannelName});
      // console.log("newChannelName", newChannelName)
      setIsChannelModal(false);
      await retrieveChannels();
    } catch (e) {
      console.log("createNewChannel", e);
    }
  }, [newChannelName, isChannelModal]);
  
  // 생성된 채널 조회
  const retrieveChannels = useCallback(async () => {
    try {
      const response = await getChannels();
      setChannelList(response.data);
    } catch (e) {
      console.log('retrieveChannels', e);
    }
  }, [channelList]);
  
  // 채널 하나 클릭
  const handleClickChannel = useCallback( async (event : any) => {
    const clickedId = event.currentTarget.children[1].children[0].value
    setSelectedChannel( prev =>
      prev === clickedId
      ? ""
      : clickedId
    );
    
    await getMessageHistory(clickedId);
  }, [selectedChannel]);
  
  // 채널 삭제
  const handleDelete = useCallback(async (event: any) => {
    try {
      await deleteChannel({channelId : selectedChannel});
  
      setIsChannelModal(false);
      setSelectedChannel("");
      await retrieveChannels();
    } catch (e) {
      console.log("handleDelete", e)
    }
  }, [selectedChannel, isChannelModal]);
  
  // 메세지 입력
  const handleSendMessage = useCallback(async (event: any) => {
    if (event.key === "Enter") {
      const request : MessageHistoryDTO = {
        channelId : selectedChannel,
        content : message
      };
      await createMessage(request);
      setMessage("");
      
      // chatGPT에 문의
      const responseGPT = await askChatGPT({question : message});
      const gptRequest : MessageHistoryDTO = {
        channelId : selectedChannel,
        content : responseGPT.data,
        bot : "ChatGPT"
      }
      await createMessage(gptRequest);
  
      await getMessageHistory(selectedChannel);
  
    }
  }, [message, selectedChannel]);
  
  // 메세지 조회
  const getMessageHistory = useCallback(async (channelId : string) => {
    const response = await getMessages({channelId : channelId});
    setMessageHistory(response.data);
  }, [messageHistory])
  
  useEffect(() => {
    retrieveChannels();
  }, []);
  
  return {
    isChannelModal,
    setIsChannelModal,
    newChannelName,
    setNewChannelName,
    createNewChannel,
    channelList,
    handleClickChannel,
    selectedChannel,
    handleDelete,
    message,
    setMessage,
    handleSendMessage,
    messageHistory
  }
}

export default useChattingTemplate;