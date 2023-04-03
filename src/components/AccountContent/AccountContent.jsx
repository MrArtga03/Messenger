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
    <Card w={'100%'}>
      <CardHeader className={styles['container-header']}>
        <Heading className={styles['header']}>
          <Text>Ваш профиль</Text>

          <Menu
            className={styles['header-menu']}
            aria-label='Hamburger opener'
            icon={<HamburgerIcon />}
          >
            <MenuButton _hover background={'none'} as={Button}>
              <DragHandleIcon />
            </MenuButton>

            <MenuList className={styles['menu-list']} border={'none'} background={'#141416'}>
              <MenuItem className={styles['menu-item']} background={'#141416'}>
                <FormButton
                  className={styles['menu-button']}
                  background={'#141416'}
                  h={'30px'}
                  w={'100%'}
                  _hover={{
                    background: '#26272d'
                  }}
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

      <CardBody background={'#474A51'} >
        <Text>Тут скоро что-то будет!!!</Text>
      </CardBody>
    </Card>
  )
}

export default AccountContent