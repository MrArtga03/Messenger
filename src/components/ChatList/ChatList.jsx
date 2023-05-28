import { useSelector, useDispatch } from 'react-redux'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'

import { chatUrl, noChatsUrl } from '../../constants/urls'
import { clickDelete } from '../../store/chatSlice'
import ChatItem from '../ChatItem/ChatItem'
import AddItemChat from '../AddItemChat/AddItemChat'
import ChatSearch from '../ChatSearch/ChatSearch'
import FormButton from '../UI/FormButton/FormButton'
import { useState } from 'react'

import styles from './ChatList.module.scss'

const ChatList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const chats = useSelector(state => state.chats.chatsList)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  let lastMessage = ''
  let lastTime = ''

  const [modalChatId, setModalChatId] = useState(null)

  const openModal = chatId => {
    setModalChatId(chatId)
  }

  const closeModal = () => {
    setModalChatId(null)
  }

  const isModalOpen = chatId => modalChatId === chatId
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
              lastMessage = chat.messages[chat.messages.length - 1]?.text
              lastTime = chat.messages[chat.messages.length - 1]?.time
              return (
                <div key={chat.id} className={styles['chats']}>
                  <Link
                    to={{
                      pathname: `${chatUrl}/${chat.id}`,
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
                      file={chat.imageURL}
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
                        <Box
                          className={styles['delete-item-button']}
                          onClick={() => {
                            openModal(chat.id)
                          }}
                        >
                          <Text className={styles['danger-zone']}>
                            <DeleteIcon /> Удалить чат
                          </Text>
                        </Box>

                        <Modal
                          isOpen={isModalOpen(chat.id)}
                          onClose={() => {
                            closeModal(chat.id)
                          }}
                        >
                          <ModalOverlay />
                          <ModalContent background={'#1c1d22'}>
                            <ModalHeader textAlign={'center'} color={'#fff'}>
                              Хотите удалить чат?
                            </ModalHeader>
                            <ModalCloseButton color={'#fff'} />
                            <ModalFooter
                              display={'flex'}
                              justifyContent={'center'}
                            >
                              <Box
                                className={styles['delete']}
                                onClick={() => {
                                  dispatch(clickDelete({ id: chat.id }))
                                  navigate(noChatsUrl)
                                }}
                              >
                                Да
                              </Box>

                              <FormButton
                                colorScheme='blue'
                                ml={3}
                                onClick={() => {
                                  closeModal(chat.id)
                                }}
                              >
                                Нет
                              </FormButton>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
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
