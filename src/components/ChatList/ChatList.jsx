import { useSelector, useDispatch } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import { CloseButton, Stack } from "@chakra-ui/react"

import { clickDelete } from "../../store/chatSlice"
import ChatItem from "../ChatItem/ChatItem"
import AddItemChat from "../AddItemChat/AddItemChat"
import ChatSearch from "../ChatSearch/ChatSearch";

import styles from './ChatList.module.scss'

const ChatList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chats = useSelector(state => state.chats.chats)
  const dispatch = useDispatch()
  console.log(chats)

  const chatQuery = searchParams.get('chats') || ''

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const query = form.search.value

    setSearchParams({chats: query})
  }

  return (
    <>
    <ChatSearch handleSubmit={handleSubmit} />

    <Stack position={'relative'} flex={'1'} overflow={'auto'}>
      <Stack h={'100vh'} spacing={2}>
        {chats.filter(
          chat => chat.title.includes(chatQuery)
        ).map((chat) => (
          <>
            <div key={chat.id} className={styles['chats']}>
              <Link 
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
                />
              </Link>
              <CloseButton
                className={styles['close-button']} 
                size='sm' 
                onClick={() => {
                  dispatch(clickDelete({id: chat.id}))
                }}
              />
            </div>
          </>
        ))}
      </Stack>
    </Stack>
    <AddItemChat />
    </>
  )
}

export default ChatList