import {useCallback, useEffect, useRef, useState} from "react";
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
import {ChannelDTO} from "../../../types/dto/ChannelDTO";
import useInfiniteScroll from "../../../hooks/sensor/useInfiniteScroll";
import {useRecoilState} from "recoil";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";

function useChattingTemplate() {
  const [isChannelModal, setIsChannelModal] = useState<boolean>(false);
  const [isDeleteChannelModal, setIsDeleteChannelModal] = useState<boolean>(false);
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [channelList, setChannelList] = useState<ChannelDTO[]>([]);
  // const [selectedChannel, setSelectedChannel] = useRecoilState(recoilCommonState.selectedChannelId);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [infPageNum, setInfPageNum] = useState<number>(-1); // -1 페이지는 마지막 페이지를 의미(최신 페이지)
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<MessageHistoryDTO[]>([]);
  const scrollRef = useRef<any>();
  const [channelBoxOpener, setChannelBoxOpener] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  const [newList ,setNewList] = useState<MessageHistoryDTO[]>([]);
  
  const messageHistoryRef = useRef<any>();
  const messageHistorysRef = useRef<any>();
  
  const [highEnd, setHighEnd] = useState<any>(null);
  const [goLatest, setGoLatest] = useState<boolean>(true);
  const [observe, unobserve, disconnect] = useInfiniteScroll(() => {
    setUpdate(prev => !prev);
  })
  
  
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
      setChannelList(response.data ? response.data : []);
    } catch (e) {
      console.log('retrieveChannels', e);
    }
  }, [channelList, goLatest]);
  
  // 채널 하나 클릭
  const handleClickChannel = useCallback( async (event : any) => {
    const clickedId = event.currentTarget.children[1].children[0].value;
    setSelectedChannel((prev:any) => {
      return prev === clickedId
        ? ""
        : clickedId
    });
    setChannelBoxOpener(prev => {
      if(selectedChannel === clickedId) {
        return true;
      } else {
        return false
      }
    });
    
    await getMessageHistory(clickedId);
  }, [selectedChannel, channelBoxOpener]);
  
  // 채널 삭제
  const handleDelete = useCallback(async (event: any) => {
    try {
      await deleteChannel({channelId : selectedChannel});
  
      setIsChannelModal(false);
      setSelectedChannel("");
      setIsDeleteChannelModal(false);
      await retrieveChannels();
      
    } catch (e) {
      console.log("handleDelete", e)
    }
  }, [selectedChannel, isChannelModal]);
  
  // 메세지 입력
  const handleSendMessage = useCallback(async (event: any) => {
    if (event.key === "Enter" || event.type === "click") {
      const request : MessageHistoryDTO = {
        channelId : selectedChannel,
        content : message,
        bot : "user"
      };
      await createMessage(request);
      setMessage("");
      
      // 조회!
      await getMessageHistory(selectedChannel, -1);
      setMessageHistory((prev: any) => {
        return [...prev, {
          id : "loading",
          channelId : selectedChannel,
          content : "loading",
          userId : "loading",
          created : new Date(),
          bot: true
        }]
      })
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      // chatGPT에 문의
      const responseGPT = await askChatGPT({question : message});
      const gptRequest : MessageHistoryDTO = {
        channelId : selectedChannel,
        content : responseGPT.data,
        bot : "ChatGPT"
      }
      await createMessage(gptRequest);
  
      await getMessageHistory(selectedChannel, -1);
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      setGoLatest(true);
  
    }
  }, [message, selectedChannel, goLatest]);
  
  // 메세지 조회
  const getMessageHistory = useCallback(async (channelId : string, page ?: number) => {
    if (page !== undefined) {
      const response = await getMessages({channelId : channelId, page: page});
      setMessageHistory(response.data.messagesHistory);
      setInfPageNum(response.data.nextPage);
    } else {
      if (infPageNum >= 0) {
        const response = await getMessages({channelId : channelId, page: infPageNum});
        setMessageHistory((prev:any) => {
          if (prev.length > 0){
            return [
              // ...response.data.messagesHistory,
              ...prev]
          } else {
            return response.data.messagesHistory;
          }
        });
        setNewList(response.data.messagesHistory)
        setInfPageNum(response.data.nextPage)
        }
    }
  }, [messageHistory, infPageNum, selectedChannel, newList]);
  
  useEffect(() => {
    getMessageHistory(selectedChannel, -1);
    observe(messageHistoryRef.current);
  }, [selectedChannel]);
  //
  useEffect(() => {
    // messageHistoryRef.current.scrollIntoView({block : "end"});
    unobserve(messageHistoryRef.current);
    getMessageHistory(selectedChannel);
    setShow(true);
  
    messageHistorysRef.current?.scrollIntoView(true);
    setTimeout(() => {
      observe(messageHistoryRef.current);
    }, 5000);

  
  }, [update]);
  
  useEffect(() => {
    messageHistory.length <= 10 && scrollRef.current.scrollIntoView(false);  // 스크롤 맨 아래로 기본 값s
    retrieveChannels();
  }, [messageHistory]);
  
  useEffect(() => {
    const resizeListener = () => {
      // setInnerWidth(window.innerWidth);
      setInnerWidth(window.innerWidth)
    };
    window.addEventListener("resize", resizeListener);
  }, [window.innerWidth]);
  
  return {
    isChannelModal,
    setIsChannelModal,
    isDeleteChannelModal,
    setIsDeleteChannelModal,
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
    messageHistory,
    scrollRef,
    channelBoxOpener,
    setChannelBoxOpener,
    innerWidth,
    messageHistoryRef,
    highEnd,
    messageHistorysRef,
    show, newList
  }
}

export default useChattingTemplate;