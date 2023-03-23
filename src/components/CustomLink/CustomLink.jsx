import { Link, useMatch } from 'react-router-dom'

const CustomLink = ({children, to, ...props}) => {
  const match = useMatch(to)

  return (
    <Link
      to={to}
      style= {{
        textDecoration: match ? 'underline #bebebe' : ''
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default CustomLink