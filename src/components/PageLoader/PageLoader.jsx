import { Box, Spinner } from "@chakra-ui/react"

const PageLoader = () => {
  return (
    <Box 
      display={'flex'}  
      justifyContent={'center'}
      alignItems={'center'}
      h={'100vh'} 
      w={'100%'} 
      background={'#141416'}
    >
      <Spinner color={'#fff'} size='xl'/>
    </Box>
  )
}

export default PageLoader