import { Box, Spinner } from "@chakra-ui/react"

import styles from './PageLoader.module.scss'

const PageLoader = () => {
  return (
    <Box className={styles.container}>
      <Spinner size='xl'/>
    </Box>
  )
}

export default PageLoader