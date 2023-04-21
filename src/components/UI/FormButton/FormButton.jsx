import { Button } from "@chakra-ui/react";

const FormButton = ({children, ...props}) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  )
}

export default FormButton