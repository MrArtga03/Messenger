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

const Layout = () => {
  return (
    <>
      <main className={styles["main-conteiner"]}>
        <Stack minW={"300px"} h={"100vh"} background={"#141416"}>
          <Card>
            <CardHeader 
              background={"#202123"} 
              color={"#fff"}
              p={'18px'}
            >
              <Heading 
                display={'flex'} 
                justifyContent={'center'}  
                flexDirection={'column'}
                textAlign={"center"} 
                fontSize={"23px"}
              >
                <Link to="/" className={styles["nav-link"]}>
                  Messenger
                </Link>

                <Link style={{fontSize: '14px', marginTop: '5px'}} to='/account' className={styles["nav-link"]}>
                  Account
                </Link>
              </Heading>
            </CardHeader>

            <CardBody
              display={"flex"}
              flexDirection={'column'}
              justifyContent={"center"}
              background={"#141416"}
              color={"#fff"}
              padding={'0'}
            >
              <ChatSearch/>
            </CardBody>
          </Card>
        </Stack>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
