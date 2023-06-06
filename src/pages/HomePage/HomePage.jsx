import React, { useEffect, useState } from 'react'
import {Box, Image, Stack, Text} from '@chakra-ui/react'

import PageLoader from '../../components/PageLoader/PageLoader'
import {welcomeImage} from "../../constants/urls";

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
        <Image
            className={styles.image}
            src={welcomeImage}
        />
      </Stack>
    </Box>
  )
}

export default HomePage
