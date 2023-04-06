import {  Box, Text, Stack } from "@chakra-ui/react"

import styles from './ChatItem.module.scss'

const ChatItem = ({ title, lastMessage, lastTime }) => {
  return (
    <Box 
      className={styles.container}
    >
      <Box>
        <Text color={'#fff'} fontSize={'18px'}>
          {title}
        </Text>

        <Stack 
          display={'flex'}
          flexDirection={'row'} 
          alignItems={'center'}
          justify={'space-between'} 
        >
          <Text color={'#fff'} fontSize={'14px'}>
            {lastMessage}                 
          </Text>
          <Text m={'0 !important'} color={'#fff'} fontSize={'10px'}>
            {lastTime}                 
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default ChatItem