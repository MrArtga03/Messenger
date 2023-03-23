import { Link, Outlet } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from "@chakra-ui/react"

import CustomLink from "../CustomLink/CustomLink"

import styles from "./Layout.module.scss"

const Layout = () => {
  return (
    <>
      <main className={styles["main-conteiner"]}>
        <Stack minW={"300px"} h={"100vh"} background={"#141416"}>
          <Card>
            <CardHeader 
              background={"#1c1d22"} 
              color={"#fff"}
            >
              <Heading 
                display={'flex'} 
                justifyContent={'center'}  
                flexDirection={'column'}
                textAlign={"center"} 
                fontSize={"23px"}
              >
                <Link to="/" className={styles["nav-link"]}>
                  Messanger
                </Link>

                <Link style={{fontSize: '14px', marginTop: '5px'}} to='/account' className={styles["nav-link"]}>
                  Account
                </Link>
              </Heading>
            </CardHeader>

            <CardBody
              display={"flex"}
              justifyContent={"center"}
              background={"#141416"}
              color={"#fff"}
            >
              <Stack display={"flex"} align={"center"} spacing={"8"} mt={'50%'}>
                <CustomLink to="/organizations" className={styles["nav-link"]}>
                  Organizations
                </CustomLink>

                <CustomLink to='/chat' className={styles['organization-link']}>
                  Chat
                </CustomLink>

                <CustomLink to='/setting' className={styles['organization-link']}>
                  Settings
                </CustomLink>

                <CustomLink to="/menu" className={styles["nav-link"]}>
                  Menu
                </CustomLink>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
