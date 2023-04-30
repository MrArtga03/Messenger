import { Box, Stack, Text } from '@chakra-ui/react'

import styles from './NoMessages.module.scss'

const NoMessages = () => {
  return (
    <Box className={styles.container}>
      <Stack className={styles.wrapper}>
        <Text className={styles.text}>Пока нет сообщений...</Text>
      </Stack>
    </Box>
  )
}

export default NoMessages
