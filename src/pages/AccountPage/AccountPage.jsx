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

import { useAuth } from "../../hook/useAuth"

const AccountPage = () => {
  const { signout } = useAuth()
  const navigate = useNavigate()

  return (
    <Card w={'100%'}>
      <CardHeader background={'#1c1d22'} color={'#fff'}>
        <Heading display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Text>Ваш профиль</Text>

          <Menu
            color={"#fff"}
            fontSize={'30px'}
            aria-label='Hamburger opener'
            _hover
            icon={<HamburgerIcon />}
          >
            <MenuButton _hover background={'none'} as={Button}>
              <DragHandleIcon />
            </MenuButton>

            <MenuList border={'none'} background={'#141416'}>
              <MenuItem background={'#141416'}>
                <Button
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
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Heading>
      </CardHeader>

      <CardBody background={'#474A51'} >
        <Text>Тут скоро что-то будет!!!</Text>
      </CardBody>
    </Card>
  );
};

export default AccountPage;
