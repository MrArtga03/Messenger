import { Box, Stack } from '@chakra-ui/react'

import FormButton from '../UI/FormButton/FormButton'

import styles from './Reactions.module.scss'

const Reactions = () => {
  return (
    <Box className={styles.container}>
      <Stack className={styles.wrapper}>
        <FormButton className={styles.smile}>😂</FormButton>
        <FormButton className={styles.smile}>😭</FormButton>
        <FormButton className={styles.smile}>😡</FormButton>
        <FormButton className={styles.smile}>👍</FormButton>
        <FormButton className={styles.smile}>👎</FormButton>
        <FormButton className={styles.smile}>❓</FormButton>
      </Stack>
    </Box>
  )
}

export default Reactions
