import { Link } from 'react-router-dom'
import PageNavigation from '../../components/PageNavigation/PageNavigation'

const NoMatch = () => {
  return (
    <>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      background: '#000',
      color: '#fff'
    }}>
      Страница не найдена
      <Link to='/'>
        Home
      </Link>
      <PageNavigation />
    </div>
    </>
  )
}

export default NoMatch