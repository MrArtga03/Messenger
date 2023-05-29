import PropTypes from 'prop-types'
import {
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
        <Stack className={styles['wrapper']}>
          <Card>
            <CardHeader className={styles['header-container']}>
              <Heading className={styles['header']}>
                <Text className={styles['nav-link']}>Мессенджер</Text>
              </Heading>
            </CardHeader>

            <CardBody className={styles['body-container']}>
              <ChatList />
            </CardBody>
          </Card>
        </Stack>
        {children}
      </main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
