import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react'
import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'

import { clickDelete } from '../../store/chatSlice'
import ChatItem from '../ChatItem/ChatItem'
import AddItemChat from '../AddItemChat/AddItemChat'
import ChatSearch from '../ChatSearch/ChatSearch'

import styles from './ChatList.module.scss'

const ChatList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const chats = useSelector(state => state.chats.chatsList)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(chats)

  const chatQuery = searchParams.get('chats') || ''

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    const query = form.search.value

    setSearchParams({ chats: query })
  }

  const handleEnterSubmit = e => {
    e.preventDefault()
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <ChatSearch
        handleSubmit={handleSubmit}
        handleEnterSubmit={handleEnterSubmit}
      />

      <Stack className={styles['container-chats']}>
        <Stack h={'100vh'} spacing={2}>
          {chats
            .filter(chat => chat.title.includes(chatQuery))
            .map(chat => {
              const lastMessage = chat.messages[chat.messages.length - 1]?.text
              const lastTime = chat.messages[chat.messages.length - 1]?.time
              return (
                <div key={chat.id} className={styles['chats']}>
                  <Link
                    to={{
                      pathname: `/chat/${chat.id}`,
                      state: {
                        title: chat.title,
                        description: chat.description,
                      },
                    }}
                  >
                    <ChatItem
                      title={chat.title}
                      description={chat.description}
                      lastMessage={lastMessage}
                      lastTime={lastTime}
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
                            dispatch(clickDelete({ id: chat.id }))
                            navigate('/nochats')
                          }}
                        >
                          <DeleteIcon mr={'2px'} /> Удалить чат
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              )
            })}
        </Stack>
      </Stack>
      <AddItemChat />
    </>
  )
}

export default ChatList
