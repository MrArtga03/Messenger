import { useSelector, useDispatch } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import { Button, CloseButton, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react"
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";

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

    <Stack className={styles['container-chats']}>
      <Stack h={'100vh'} spacing={2}>
        {chats.filter(
          chat => chat.title.includes(chatQuery)
        ).map((chat) => (
          <>
            <div key={chat.id} className={styles['chats']}>
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
                  lastMessage={chat.lastMessage}
                  lastTime={chat.lastTime}
                />
              </Link>

              <Menu>
                <MenuButton
                  className={styles['menu-button']}
                  as={IconButton}
                  aria-label='Options'
                  icon={<HamburgerIcon />}
                  variant='outline'
                />
                <MenuList className={styles['menu-list']}>
                  <MenuItem className={styles['menu-item']}>
                    <Button
                      className={styles['delete-item-button']} 
                      size='sm' 
                      onClick={() => {
                        dispatch(clickDelete({id: chat.id}))
                      }}
                    >
                      <DeleteIcon mr={'2px'}/> Удалить чат
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
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