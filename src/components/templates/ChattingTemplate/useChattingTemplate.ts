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

function useChattingTemplate() {
  const [isChannelModal, setIsChannelModal] = useState<boolean>(false);
  const [isDeleteChannelModal, setIsDeleteChannelModal] = useState<boolean>(false);
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [channelList, setChannelList] = useState<ChannelDTO[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [infPageNum, setInfPageNum] = useState<number>(-1); // -1 페이지는 마지막 페이지를 의미(최신 페이지)
  const [message, setMessage] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<MessageHistoryDTO[]>([]);
  const scrollRef = useRef<any>();
  const [channelBoxOpener, setChannelBoxOpener] = useState<boolean>(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  
  const messageHistoryRef = useRef<any>();
  const [highEnd, setHighEnd] = useState<any>(null);
  const [observe, unobserve] = useInfiniteScroll( async () => {
    await getMessageHistory(selectedChannel);
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
  }, [channelList]);
  
  // 채널 하나 클릭
  const handleClickChannel = useCallback( async (event : any) => {
    const clickedId = event.currentTarget.children[1].children[0].value
    setSelectedChannel( prev =>
      prev === clickedId
      ? ""
      : clickedId
    );
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
  const getMessageHistory = useCallback(async (channelId : string, page ?: number) => {
    if (page) {
      const response = await getMessages({channelId : channelId, page: page});
      setMessageHistory(response.data.messagesHistory);
      setInfPageNum(response.data.nextPage)
    } else {
      const response = await getMessages({channelId : channelId, page: infPageNum});
      setMessageHistory(response.data.messagesHistory);
      setInfPageNum(response.data.nextPage)
    }
  }, [messageHistory]);
  
  // const infiniteScroll: IntersectionObserverCallback = async ([entry], io) => {
  //   if (entry.isIntersecting) {
  //     messageHistoryRef.current?.style.setProperty("overflowY", "hidden");
  //     io.unobserve(entry.target);
  //     await getMessageHistory(selectedChannel, infPageNum);
  //     await io.observe(entry.target);
  //     messageHistoryRef.current?.style.setProperty("overflowY", "auto");
  //   }
  // };
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // await getMessageHistory(selectedChannel)
        console.log(" 여기 와야대")
      }
    },{threshold: 1});
    observer.observe(messageHistoryRef.current);
  }, [messageHistory]);
  //
  useEffect(() => {

  }, [infPageNum]);
  
  useEffect(() => {
    retrieveChannels();
  }, [messageHistory, infPageNum]);
  
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageHistory])
  
  useEffect(() => {
    const resizeListener = () => {
      // setInnerWidth(window.innerWidth);
      console.log("화면 사이즈 보기", window.innerWidth)
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
    highEnd
  }
}

export default useChattingTemplate;