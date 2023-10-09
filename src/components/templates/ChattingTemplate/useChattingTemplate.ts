import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {createChannel, getChannels} from "../../../endpoints/chatting-endpoints";

function useChattingTemplate() {
  const [isChannelModal, setIsChannelModal] = useState<boolean>(false);
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [channelList, setChannelList] = useState<any[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("")
  
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
  const handleClickChannel = useCallback( (event : any) => {
    const clickedId = event.currentTarget.children[1].children[0].value
    setSelectedChannel( prev =>
      prev === clickedId
      ? ""
      : clickedId
    );
  }, [selectedChannel]);
  
  // 채널 삭제
  const deleteChannel = useCallback(async (event: any) => {
    
    
    setIsChannelModal(false);
    setSelectedChannel("");
  }, [selectedChannel, isChannelModal]);
  
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
    selectedChannel
  }
}

export default useChattingTemplate;