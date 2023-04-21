import { useNavigate } from "react-router-dom"
import { DragHandleIcon, HamburgerIcon } from "@chakra-ui/icons";
import { 
  Button,
  Card, 
  CardBody, 
  CardHeader, 
  Heading, 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuList, 
  Text } from "@chakra-ui/react";

import FormButton from "../UI/FormButton/FormButton";
import { useAuth } from "../../hook/useAuth"

import styles from './AccountContent.module.scss'

const AccountContent = () => {
  const { signout } = useAuth()
  const navigate = useNavigate()
  
  return (
    <Card className={styles.card}>
      <CardHeader className={styles['container-header']}>
        <Heading className={styles.header}>
          <Text className={styles['header-title']}>Ваш профиль</Text>

          <Menu
            className={styles['header-menu']}
            aria-label='Hamburger opener'
            icon={<HamburgerIcon />}
          >
            <MenuButton className={styles['menu-button']} as={Button}>
              <DragHandleIcon />
            </MenuButton>

            <MenuList className={styles['menu-list']}>
              <MenuItem className={styles['menu-item']}>
                <FormButton
                  className={styles['menu-logout-button']}
                  onClick={() =>
                    signout(() => navigate("/auth", { replace: true }))
                  }
                >
                  Выйти
                </FormButton>
              </MenuItem>
            </MenuList>
          </Menu>
        </Heading>
      </CardHeader>

      <CardBody className={styles.body}>
        <Text>Тут скоро что-то будет!!!</Text>
      </CardBody>
    </Card>
  )
}

export default AccountContent