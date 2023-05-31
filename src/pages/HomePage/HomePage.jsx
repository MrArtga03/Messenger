import React, { useEffect, useState } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'

import PageLoader from '../../components/PageLoader/PageLoader'

import styles from './HomePage.module.scss'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return isLoading ? (
    <PageLoader />
  ) : (
    <Box className={styles.container}>
      <Stack className={styles.wrapper}>
        <Text className={styles.title}>Добро пожаловать!</Text>
        <Box className={styles.image}></Box>
      </Stack>
    </Box>
  )
}

export default HomePage
