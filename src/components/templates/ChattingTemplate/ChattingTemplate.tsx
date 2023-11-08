import styled, {css} from "styled-components";
import MainContent from "../MainContent/MainContent";
import React, {useCallback, useEffect} from "react";
import axios from "axios";
import TextInput from "../../elements/TextInput";
import CustomButton from "../../elements/Button/CustomButton";
import ChatMessage from "./ChatMessage";
import ChannelBox from "./ChannelBox";
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import {Box, Divider, IconButton, Modal} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useChattingTemplate from "./useChattingTemplate";
import SimpleSave from "../SimpleSave";
import ModalModule from "../../modules/ModalModule";
import SimpleDelete from "../SimpleDelete";
import {DehazeRounded} from "@material-ui/icons";


function ChattingTemplate() {
  const {
    isChannelModal, setIsChannelModal,
    isDeleteChannelModal, setIsDeleteChannelModal,
    newChannelName, setNewChannelName,
    createNewChannel, channelList,
    handleClickChannel, selectedChannel,
    handleDelete, message, setMessage,
    handleSendMessage, messageHistory,
    scrollRef, channelBoxOpener, setChannelBoxOpener
  } = useChattingTemplate();
  
  console.log("선택한 채널", selectedChannel)
  
  return (
    <MainContent
      title="ChatGPT"
      header={
        <div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {setChannelBoxOpener(prev => !prev)}}
          >
            <DehazeRounded/>
          </IconButton>
        </div>
      }
    >
      <StyledChattingTemplate channelBoxOpener={channelBoxOpener}>
        <div className="channel-view">
          <Paper
            component="form"
            sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', height : "2rem"}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="search"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div className="channel-list">
            {channelList?.map(el => {
              return (
                <ChannelBox
                  key={el.id}
                  id={el.id}
                  title={el.name}
                  lastestMessage={el.lastestMessage}
                  onClick={handleClickChannel}
                  selectedChannel={selectedChannel}
                />
              )
            })}
          </div>
          <div className="footer">
            <CustomButton
              onClick={() => setIsChannelModal(true)}
            >
              New Channel
            </CustomButton>
            <CustomButton
              onClick={() => {setIsDeleteChannelModal(true)}}
            >
              Delete
            </CustomButton>
            
            {/* 생성 및 수정 모달 */}
            <ModalModule
              open={isChannelModal}
              onClose={() => setIsChannelModal(false)}
            >
              <SimpleSave
                title="New Channel"
                contents={newChannelName}
                onChange={(event : any) => {
                  setNewChannelName(event.target.value)
                }}
                onOk={createNewChannel}
                onCancel={() => setIsChannelModal(false)}
  
              />
            </ModalModule>
  
            {/* 삭제 모달 */}
            <ModalModule
              open={isDeleteChannelModal}
              onClose={() => setIsDeleteChannelModal(false)}
            >
              <SimpleDelete
                // title={selectedChannel}
                onDelete={handleDelete}
                onCancel={() => setIsDeleteChannelModal(false)}
              />
            </ModalModule>
          </div>
          
        </div>
        <div className="chat-view">
          
          <div className="message-history">
            {selectedChannel ? (
              <>
                <span className="start-message"
                  onClick={() => {setChannelBoxOpener(prev => !prev)}}
                >
                  {channelList.filter(el => el.id === selectedChannel)[0].name}
                </span>
                <hr />
              </>
            ) : (
              <>
                <span/>
              </>
            )}
            {selectedChannel ? messageHistory.map((el, inx) => {
              return (
                <>
                  {el.userId === "ChatGPT" ? (
                    <ChatMessage key={inx} type={""} {...el}/>
                  ) : (
                    <>
                      {el.userId === "loading" ? (
                        <ChatMessage key={inx} type={"loading"} {...el}/>
                      ) : (
                        <ChatMessage key={inx} type={"me"} {...el}/>
                       )}
                   </>
              )}</>)
            }) : (
              <span className="default-message">Select Channel Please!</span>
            )}
            <div ref={scrollRef} />
          </div>
          <div className="message-write">
            <TextInput
              value={message}
              onChange={(event : any) => {
                setMessage(event.target.value)
              }}
              onKeyPress={handleSendMessage}
            />
            <CustomButton onClick={handleSendMessage}>
              전송
            </CustomButton>
          </div>
        </div>
      </StyledChattingTemplate>
    </MainContent>
  )
  
}

export default ChattingTemplate;

const StyledChattingTemplate = styled.div<{channelBoxOpener : boolean}>`
  
  display: flex;
  width: 100%;
  gap: 1rem;
  height: 100%;

  @media only screen and (min-width: 0px) and (max-width: 1199px) {
    .channel-view {
      position: absolute;
      display: flex;
      flex-direction: column;
      transition-property: transform;
      transition-duration: 200ms;
      ${props => props.channelBoxOpener
        ? css `
          transform: translateX(0rem);
          opacity: 1;
          pointer-events: visible;
        ` : css `
          transform: translateX(-20rem);
          opacity: 1;
          pointer-events: visible;
      `}
      z-index: 10000;
      height: -webkit-fill-available;
      background-color: #f2f2ef;
      padding: 1rem 0.5rem;
      border-radius: 1rem 1rem;
      overflow-y: hidden;
      overflow-x: hidden;
      .channel-list {
        border: 1px solid gray;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        height: inherit;
        overflow-y: auto;
        margin-bottom: 2rem;
      }

      .footer {
        display: flex;
        justify-content: space-between;
      }
    }
    .chat-view {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0.5rem 0.5rem;
      border-radius: 1rem 1rem;
      align-items: center;

      span {
        &:first-child {
          justify-content: center;
          color: gray;
        }
      }

      hr {
        width: 100%;
        border: 1px solid #cccccc;
      }

      .message-history {
        padding-right: 0.5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        overflow-x: hidden;
        align-items: center;
        padding-bottom: 1rem;
        //height: 20px;
        flex-grow: 1;
        height: 100%;

        span {
          &:first-child {
            margin-bottom: -1rem;
          }

          &:hover {
            cursor: default;
          }
        }

        .default-message {
          &:hover {
            cursor: default;
          }
          cursor:default;
          align-items: center;
          line-height: 70vh;
          user-select: none;
          color: gray;
        }
      }

      .message-write {
        display: flex;
        height: 5rem;
        align-items: center;
        width: 100%;

        .caIjNN { // textInput
          flex-grow: 1;
        }
      }
    }
  }
  
  @media only screen and (min-width: 1200px){
    .channel-view {
      display: flex;
      flex-direction: column;
      width: 18rem;
              //position: absolute;
      z-index: 10000;
      height: auto;
      background-color: white;
      padding: 1rem 0.5rem;
      border-radius: 1rem 1rem;
      overflow-y: hidden;
      overflow-x: hidden;
      .channel-list {
        border: 1px solid gray;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        height: 100%;
        overflow-y: auto;
        margin-bottom: 2rem;
      }

      .footer {
        display: flex;
        justify-content: space-between;
      }
    }

    .chat-view {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0.5rem 0.5rem;
      border-radius: 1rem 1rem;
      align-items: center;

      span {
        &:first-child {
          justify-content: center;
          color: gray;
        }
      }

      hr {
        width: 100%;
        border: 1px solid #cccccc;
      }

      .message-history {
        padding-right: 0.5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        overflow-x: hidden;
        align-items: center;
        padding-bottom: 1rem;
        height: 20px;
        flex-grow: 1;

        span {
          &:first-child {
            margin-bottom: -1rem;
          }

          &:hover {
            cursor: pointer;
          }
        }

        .default-message {
          &:hover {
            cursor: default;
          }
          align-items: center;
          line-height: 70vh;
          user-select: none;
          color: gray;
        }
      }

      .message-write {
        display: flex;
        height: 5rem;
        align-items: center;
        width: 100%;

        .caIjNN { // textInput
          flex-grow: 1;
        }
      }
    }
  }


`;