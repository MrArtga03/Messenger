import { Link, Outlet } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from "@chakra-ui/react"

import styles from "./Layout.module.scss"
import ChatSearch from "../ChatSearch/ChatSearch"
import ChatList from "../ChatList/ChatList"

const Layout = ({ children }) => {
  return (
    <>
      <main className={styles["main-conteiner"]}>
        <Stack minW={"400px"} h={"100vh"} background={"#141416"}>
          <Card>
            <CardHeader className={styles['header-container']}>
              <Heading 
                className={styles['header']}
              >
                <Link to="/" className={styles["nav-link"]}>
                  Messenger
                </Link>

                <Link style={{fontSize: '14px', marginTop: '5px'}} to='/account' className={styles["nav-link"]}>
                  Account
                </Link>
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

export default Layout
