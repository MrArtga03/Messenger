import {  Box, Text, CloseButton } from "@chakra-ui/react"

import styles from './ChatItem.module.scss'

const ChatItem = ({ title, description, onClick  }) => {
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
      <CloseButton className={styles['close-button']} size='sm' onClick={onClick}/>
    </Box>
  )
}

export default ChatItem