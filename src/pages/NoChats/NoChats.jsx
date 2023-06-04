import { Box, Stack, Text } from '@chakra-ui/react'

import PageNavigation from '../../components/PageNavigation/PageNavigation'

import styles from './NoChats.module.scss'

const NoChats = () => {
  return (
    <Stack className={styles.nochats}>
      <Box className={styles.navigations}>
        <PageNavigation />
      </Box>
      <Text>Выберите чат или создайте новый</Text>
    </Stack>
  )
}

export default NoChats
