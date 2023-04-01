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
      <CloseButton size='sm' position={'absolute'} top={'0'} right={'0'} onClick={onClick}/>
    </Box>
  )
}

export default ChatItem