import { Stack } from "@chakra-ui/react"
import { useState } from "react"

import ChatItem from "../ChatItem/ChatItem"
import AddItemChat from "../AddItemChat/AddItemChat"

const ChatList = () => {
  const [chats, setChats] = useState([])

  const handleAddChat = (title, description) => {
    setChats([
      ...chats, 
      { 
        id: `${title} - ${chats.length + 1}`, 
        title: title,
        description: description
      }]);
  };

  const clickDelete = (index) => {
    const newItems = [...chats];
    newItems.splice(index, 1);
    setChats(newItems);
  }

  return (
    <>
    <Stack position={'relative'} flex={'1'} overflow={'auto'}>
      <Stack h={'100vh'} spacing={2}>
        {chats.map((chat, index) => (
          <ChatItem key={chat.id} title={chat.title} description={chat.description} onClick={() => clickDelete(index)}/>
        ))}
      </Stack>
    </Stack>
    <AddItemChat onAddChat={handleAddChat} />
    </>
  )
}

export default ChatList