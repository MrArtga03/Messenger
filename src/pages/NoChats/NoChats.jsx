import { Stack, Text } from '@chakra-ui/react'

import styles from './NoChats.module.scss'

const NoChats = () => {
  return (
    <Stack className={styles.nochats}>
      <Text>Выберите чат или создайте новый</Text>
    </Stack>
  )
}

export default NoChats
