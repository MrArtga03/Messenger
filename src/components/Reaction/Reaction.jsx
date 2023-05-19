import { Box, Stack, Text } from '@chakra-ui/react'

import styles from './Reaction.module.scss'

const Reaction = ({ children, onClick }) => {
  return (
    <Box onClick={onClick} className={styles['container-reaction']}>
      <Stack className={styles['wrapper-reaction']}>
        <Text className={styles.smile}>{children}</Text>
      </Stack>
    </Box>
  )
}

export default Reaction
