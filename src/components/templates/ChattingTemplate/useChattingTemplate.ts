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
  const [isLoading, setLoading] = useState<boolean>(false);
  
  const messageHistoryRef = useRef<any>();
  const messageHistorysRef = useRef<any>();
  
  const [highEnd, setHighEnd] = useState<any>(null);
  const [goLatest, setGoLatest] = useState<boolean>(true);
  
  
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
  const retrieveChannels = useCallback(async (channelName ?: string) => {
    try {
      
      const response = await getChannels({channelName : channelName || ""});
      setChannelList(response.data ? response.data : []);
    } catch (e) {
      console.log('retrieveChannels', e);
    }
  }, [channelList, goLatest]);
  
  // 채널 하나 클릭
  const handleClickChannel = useCallback( async (event : any) => {
    const clickedId = event.currentTarget.children[1].children[0].value;
    let selectOrNot : boolean;
    
    if (selectedChannel) {
      if (clickedId === selectedChannel) {
        selectOrNot = false;
      } else {
        selectOrNot = true;
      }
    } else {
      selectOrNot = true;
    }
    
    console.log("selectOrNot", selectOrNot)
    setSelectedChannel((prev:any) => {
      return selectOrNot
        ? clickedId
        : ""
    });
    setInfPageNum((prev:number) => {
      return -1
    })
    setChannelBoxOpener(prev => {
      if(selectedChannel === clickedId) {
        return true;
      } else {
        return false
      }
    });
    if (clickedId) {
      if (selectOrNot) {
        await getMessageHistory(clickedId);
      }
    }
  }, [selectedChannel, channelBoxOpener, infPageNum]);
  
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
      event.preventDefault();
      if (event.shiftKey) { // shift + enter를 쳤을 떄 줄바꿈 가능하게
        return;
      } else {
        const request : MessageHistoryDTO = {
          channelId : selectedChannel,
          content : message,
          bot : "user"
        };
        await createMessage(request);
        setMessage("");
  
        // 조회!
        await getMessageHistory(selectedChannel, -1);
  
        await setMessageHistory((prev: any) => {
          return [{
            id : "loading",
            channelId : selectedChannel,
            content : "loading",
            userId : "loading",
            created : new Date(),
            bot: true
          }, ...prev]
        })
        // chatGPT에 문의
        const responseGPT = await askChatGPT({question : message});
        const gptRequest : MessageHistoryDTO = {
          channelId : selectedChannel,
          content : responseGPT.data,
          bot : "ChatGPT"
        }
        await createMessage(gptRequest);
  
        await getMessageHistory(selectedChannel, -1);
        setGoLatest(true);
      }
    }
  }, [message, selectedChannel, goLatest]);
  
  // 메세지 조회
  const getMessageHistory = useCallback(async (channelId : string, page ?: number) => {
    if (page !== undefined) {
      const response = await getMessages({channelId : channelId, page: page});
      await setMessageHistory(response.data.messagesHistory.reverse());
      await setInfPageNum(response.data.nextPage);
    } else {
      if (infPageNum >= 0) {
        const response = await getMessages({channelId : channelId, page: infPageNum});
        setMessageHistory((prev:any) => {
          if (prev.length > 0){
            return response.data.messagesHistory.concat(prev.reverse()).reverse();
          } else {
            const result = response.data.messagesHistory.reverse();
            return result;
          }
        });
        setNewList(response.data.messagesHistory)
        setInfPageNum(response.data.nextPage);
      } else {
        const response = await getMessages({channelId : channelId, page: -1});
        setMessageHistory(response.data.messagesHistory?.reverse());
        setInfPageNum(response.data.nextPage);
      }
    }
  }, [messageHistory, infPageNum, selectedChannel, newList, isLoading]);
  
  useEffect(() => {
    if (selectedChannel) {
      getMessageHistory(selectedChannel);
    }
  }, [selectedChannel]);
  
  useEffect(() => {
    if (selectedChannel) {
    const options = {
      threshold: 1,
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            // 더 많은 아이템을 로드하기 위한 로직 실행
            setUpdate(prev => !prev);
            if (infPageNum !== -1) {
              setLoading(true);
            } else {
              setLoading(false);
            }
          }
        });
      }, options);
      
      if (messageHistoryRef.current) {
        observer.observe(messageHistoryRef.current);
      }
      return () => {
        if (messageHistoryRef.current) {
          observer.unobserve(messageHistoryRef.current);
        }
      };
    } else {
    
    }
    
  }, [messageHistoryRef, selectedChannel, infPageNum]);
  //
  useEffect(() => {
    if (selectedChannel && infPageNum >= 0 && isLoading) {
      console.log("여기 오나")
      setTimeout(() => {
        getMessageHistory(selectedChannel);
        // setLoading(false);
      }, 500);
    }
  }, [update, isLoading]);
  
  useEffect(() => {
    if(messageHistory?.length <= 10) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight / 2;
    }
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
    retrieveChannels,
    highEnd,
    messageHistorysRef,
    show, newList,
    update, isLoading
  }
}

export default useChattingTemplate;