import {  Box, Text } from "@chakra-ui/react"

import styles from './ChatItem.module.scss'

const ChatItem = ({ title, description  }) => {
  return (
    <Box 
      className={styles.container}
    >
      <Box>
        <Text color={'#fff'} fontSize={'16px'}>
          {title}
        </Text>

        <Text color={'#fff'} fontSize={'14px'}>
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default ChatItem