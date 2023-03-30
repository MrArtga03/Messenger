import { useSelector, useDispatch } from "react-redux"
import { Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import { clickDelete } from "../../store/chatSlice"
import ChatItem from "../ChatItem/ChatItem"
import AddItemChat from "../AddItemChat/AddItemChat"

const ChatList = () => {
  const chats = useSelector(state => state.chats.chats)
  const dispatch = useDispatch()
  console.log(chats)

  return (
    <>
    <Stack position={'relative'} flex={'1'} overflow={'auto'}>
      <Stack h={'100vh'} spacing={2}>
        {chats.map((chat, index) => (
          <Link 
            key={chat.id}
            to={{
              pathname: `/chat/${chat.id}`,
              state: { 
                title: chat.title,
                description: chat.description,
              }
            }}
          >
            <ChatItem 
              key={chat.id} 
              title={chat.title} 
              description={chat.description} 
              onClick={() => dispatch(clickDelete({id: chat.id}))} 
            />
          </Link>
        ))}
      </Stack>
    </Stack>
    <AddItemChat />
    </>
  )
}

export default ChatList