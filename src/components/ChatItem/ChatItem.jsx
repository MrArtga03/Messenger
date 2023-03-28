import {  Box, Text, CloseButton } from "@chakra-ui/react"

const ChatItem = ({ title, description, onClick  }) => {
  return (
    <Box 
      display={'flex'} 
      position={'relative'}
      flexDirection={'column'}
      w={'100%'} 
      h={'50px'}
      borderTop={'1px solid #2B2B2B'}
      borderBottom={'1px solid #2B2B2B'}
      _hover={{
        background: '#2B2B2B'
      }}
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