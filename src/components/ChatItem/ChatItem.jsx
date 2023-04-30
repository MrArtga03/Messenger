import { Box, Text, Stack, Wrap, Image, WrapItem } from '@chakra-ui/react'

import styles from './ChatItem.module.scss'

const ChatItem = ({ title, lastMessage, lastTime, file }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles['container-chat-data']}>
        <Box>
          <Wrap>
            <WrapItem>
              <Image
                className={styles['avatar-chat']}
                boxSize={'45px'}
                borderRadius='full'
                src={
                  file
                    ? file
                    : 'https://media.istockphoto.com/id/1392182937/zh/%E5%90%91%E9%87%8F/no-image-available-photo-coming-soon.jpg?s=612x612&w=0&k=20&c=Ot9bY5dAFt9KaAIJHv5sKhU88-Hn89XEJzuD1TwuV8Q='
                }
              />
            </WrapItem>
          </Wrap>
        </Box>
        {lastMessage ? (
          <>
            <Box className={styles['container-data']}>
              <Text className={styles['title']}>{title}</Text>

              <Stack className={styles['chat-data']}>
                <Text className={styles['text']}>{lastMessage}</Text>
                <Text className={styles['time']}>{lastTime}</Text>
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

export default ChatItem
