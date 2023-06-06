import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

import ChatList from '../ChatList/ChatList'

import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <main className={styles['main-container']}>
        <Stack className={styles.wrapper}>
          <Card>
            <CardHeader className={styles['header-container']}>
              <Heading className={styles.header}>
                <Text className={styles['nav-link']}>Мессенджер</Text>
              </Heading>
            </CardHeader>

            <CardBody className={styles['body-container']}>
              <ChatList />
            </CardBody>
          </Card>
          w
        </Stack>
        <Box className={styles.children}>{children}</Box>
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
