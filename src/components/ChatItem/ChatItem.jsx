import PropTypes from 'prop-types'
import { Box, Text, Stack, Wrap, Image, WrapItem } from '@chakra-ui/react'

import { defaultImage } from '../../constants/urls'

import styles from './ChatItem.module.scss'

const ChatItem = props => {
  const { title, lastMessage, lastTime, file } = props

  return (
    <Box className={styles.container}>
      <Box className={styles['container-chat-data']}>
        <Box>
          <Wrap>
            <WrapItem>
              <Image
                boxSize='45px'
                className={styles['avatar-chat']}
                src={file ? file : defaultImage}
              />
            </WrapItem>
          </Wrap>
        </Box>
        {lastMessage ? (
          <>
            <Box className={styles['container-data']}>
              <Text className={styles['title']}>{title}</Text>

              <Stack className={styles['chat-data']}>
                <Text className={styles.text}>{lastMessage}</Text>
                <Text className={styles.time}>{lastTime}</Text>
              </Stack>
            </Box>
          </>
        ) : (
          <Box className={styles['container-title']}>
            <Text className={styles['title-no-message']}>{title}</Text>
            <Text className={styles['text-no-message']}>Нет сообщений</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

ChatItem.propTypes = {
  title: PropTypes.string,
  lastMessage: PropTypes.string,
  lastTime: PropTypes.string,
  file: PropTypes.string,
}

export default ChatItem
