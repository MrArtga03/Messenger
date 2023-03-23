import { useAuth } from "../../hook/useAuth"
import { Outlet, useNavigate } from "react-router-dom"
import { CheckCircleIcon, AddIcon } from "@chakra-ui/icons"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
} from "@chakra-ui/react"

import CustomLink from "../CustomLink/CustomLink"

import styles from "./Layout.module.scss"

const Layout = () => {
  const { signout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <main className={styles["main-conteiner"]}>
        <Stack minW={"300px"} h={"100vh"} background={"#141416"}>
          <Card>
            <CardHeader background={"#1c1d22"} color={"#fff"}>
              <Heading textAlign={"center"} fontSize={"20px"}>
                Messanger
              </Heading>
            </CardHeader>

            <CardBody
              display={"flex"}
              justifyContent={"center"}
              background={"#141416"}
              color={"#fff"}
            >
              <Stack display={"flex"} align={"center"} spacing={"8"} mt={"25%"}>
                <CustomLink to="/" className={styles["nav-link"]}>
                  Home
                </CustomLink>

                <CustomLink to="/organizations" className={styles["nav-link"]}>
                  Organizations
                </CustomLink>

                <CustomLink to="/menu" className={styles["nav-link"]}>
                  Menu
                </CustomLink>

                <CustomLink to="/auth" className={styles["nav-link"]}>
                  <CheckCircleIcon /> Sing In
                </CustomLink>

                <CustomLink to="/reg" className={styles["nav-link"]}>
                  <AddIcon /> Sing Up
                </CustomLink>

                <Button
                  color={"#000"}
                  onClick={() =>
                    signout(() => navigate("/auth", { replace: true }))
                  }
                >
                  Log out
                </Button>
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
