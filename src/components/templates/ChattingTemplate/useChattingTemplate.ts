import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {
  createChannel,
  createMessage, createUserMessage,
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
import useAxios, {axiosUtils} from "../../../utilities/useAxios";

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
  const {authEP} = useAxios();
  
  // 생성된 채널 조회
  const retrieveChannels = useCallback(async (inputData ?: string) => {
    try {
      const response = await authEP({
        func : getChannels,
        params : {
          channelName : inputData || "",
          message : inputData || ""
        },
      });
      // const response = await getChannels({channelName : channelName || ""});
      setChannelList(response.data ? response.data : []);
      return response.data ? response.data : []
    } catch (e) {
      console.log('retrieveChannels', e);
    }
  }, [channelList, goLatest]);
  
  //
  const handleSelectChannel = useCallback(async (clickedId : string) => {
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
  
  // 새로운 채널 생성
  const createNewChannel = useCallback(async () => {
    try {
      const resNewChannel = await authEP({
        func : createChannel,
        params : {
          channelName : newChannelName || ""
        }
      })
      setIsChannelModal(false);
      await retrieveChannels();
      console.log("resNewChannel", resNewChannel);
      if (resNewChannel.status === 200) {
        handleSelectChannel(resNewChannel.data?.id)
      } else {
        throw resNewChannel.statusText;
      }
    } catch (e) {
      console.log("createNewChannel", e);
    }
  }, [newChannelName, isChannelModal, handleSelectChannel]);
  
  // 채널 하나 클릭
  const handleClickChannel = useCallback( async (event : any) => {
    const clickedId = event.currentTarget.children[1].children[0].value;
    await handleSelectChannel(clickedId);
  }, [handleSelectChannel]);
  
  // 채널 삭제
  const handleDelete = useCallback(async () => {
    try {
      await authEP({
        func : deleteChannel,
        params : {
          channelId : selectedChannel
        }
      })
  
      setIsChannelModal(false);
      setIsDeleteChannelModal(false);
      
      const channels = await retrieveChannels();
      const deletedChannelInx = channelList.map((el:ChannelDTO) => el.id).indexOf(selectedChannel);
      console.log("channel", selectedChannel, channelList, deletedChannelInx)
      let nextChannelId = ""
      if (channels.length - 1 < deletedChannelInx) {
        if (channels && channels?.length) {
          nextChannelId = channels[channels.length - 1]?.id || "";
        }
      } else {
        nextChannelId = channels[deletedChannelInx]?.id || "";
      }
      console.log("nextChannelId", nextChannelId)
      setSelectedChannel(nextChannelId);
  
    } catch (e) {
      console.log("handleDelete", e)
    }
  }, [selectedChannel, isChannelModal, retrieveChannels, channelList]);
  
  // 메세지 입력
  const handleSendMessage = useCallback(async (event: any) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      console.log("값 확인", event.key, event.shiftKey)
      if (event.key === 'Enter' && event.shiftKey) {
        setMessage((prevText) => prevText + '\n');
      } else {
        const request : MessageHistoryDTO = {
          channelId : selectedChannel,
          content : message,
          bot : "user"
        };
        setMessage("");
        await authEP({
          func : createUserMessage,
          reqBody : request
        })
        // await createUserMessage(request);
        // 조회!
        
        await getMessageHistory(selectedChannel, -1);
        
        
        await setMessageHistory((prev: any) => {
          return [{
            id : "loading",
            channelId : selectedChannel,
            content : "loading",
            userId : "loading",
            created : new Date(),
            bot: true,
          }, ...prev]
        })
        
        await authEP({
          func : createMessage,
          reqBody : request
        })
        // await createMessage(request);
  

  

        // chatGPT에 문의
        const responseGPT = await authEP({
          func : askChatGPT,
          reqBody : {
              channelId : selectedChannel,
              question : message
          }
        })
        // const responseGPT = await askChatGPT({
        //   channelId : selectedChannel,
        //   question : message
        // });
        const gptRequest : MessageHistoryDTO = {
          channelId : selectedChannel,
          content : responseGPT.data,
          bot : "ChatGPT"
        }
        
        await authEP({
          func : createUserMessage,
          reqBody : gptRequest,
        })
        // await createUserMessage(gptRequest);
        await getMessageHistory(selectedChannel, -1);
        
        await authEP({
          func : createMessage,
          reqBody : gptRequest,
        })
        // await createMessage(gptRequest);
  
        setGoLatest(true);
      }
    }
  }, [message, selectedChannel, goLatest]);
  
  // 메세지 조회
  const getMessageHistory = useCallback(async (channelId : string, page ?: number) => {
    if (page !== undefined) {
      const response = await authEP({
        func : getMessages,
        params : {
          channelId : channelId,
          page : page
        }
      });
      
      // const response = await getMessages({channelId : channelId, page: page});
      await setMessageHistory(response.data.messagesHistory.reverse());
      await setInfPageNum(response.data.nextPage);
    } else {
      if (infPageNum >= 0) {
        const response = await authEP({
          func : getMessages,
          params : {
            channelId : channelId,
            page : infPageNum
          }
        })
        // const response = await getMessages({channelId : channelId, page: infPageNum});
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
        
  
        const response = await authEP({
          func : getMessages,
          params : {
            channelId : channelId,
            page : -1
          }
        })
        console.log("response", response.data)
        // const response = await getMessages({channelId : channelId, page: -1});
        setMessageHistory(response.data.messagesHistory?.reverse());
        setInfPageNum(response.data.nextPage);
      }
    }
  }, [messageHistory, infPageNum, selectedChannel, newList, isLoading]);
  
  const handleFocus = () => {
    setChannelBoxOpener(prev => {
      return false
    });
  }
  
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
    update, isLoading,
    handleFocus,
  }
}

export default useChattingTemplate;