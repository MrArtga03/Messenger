import { Box, IconButton, Menu, MenuButton, MenuList, Stack} from "@chakra-ui/react"
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

import FormInput from "../UI/FormInput/FormInput";
import CustomLink from "../CustomLink/CustomLink";

const ChatSearch = () => {
  return (
    <>
    <Stack
      display={'flex'} 
      flexDirection={'row'}
      align={'center'}
      w={'100%'} 
      background={'#202123'}
      p={'10px'}
    >
      <Menu>
        <MenuButton 
          as={IconButton}
          background={'#202123'} 
          fontSize={'25px'}
          _hover={{
            borderRadius: '50%',
            background: '#2B2B2B'
          }}
          icon={<HamburgerIcon />}
        />
        <MenuList background={'#202123'} border={'none'}>
          <Stack p={'10px'} display={"flex"} spacing={"4"}>
            <CustomLink to="/organizations">
              Organizations
            </CustomLink>

            <CustomLink to='/chat'>
              Chat
            </CustomLink>

            <CustomLink to='/setting'>
              Settings
            </CustomLink>
          </Stack>
        </MenuList>
      </Menu>
      <Box       
        display={'flex'} 
        flexDirection={'row'}
        align={'center'}
        mt={'0px !important'}
        ml={'8px !important'}
        p={'4px 10px'}
        borderRadius={'8px'}
        background={'#26272D'}
      >
        <FormInput 
          ml={'5px'}
          border={'none'}
          variant='outline'
          fontSize={'15px'}
          placeholder='Поиск...'
        />
        <IconButton 
          background={'#26272D'} 
          _hover={{
            background: 'none'
          }}
          aria-label='Search database' 
          icon={<SearchIcon />}
        />
      </Box>
    </Stack>
    </>
  )
}

export default ChatSearch