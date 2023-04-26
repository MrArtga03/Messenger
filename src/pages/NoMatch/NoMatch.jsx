import { Link } from 'react-router-dom'

import PageNavigation from '../../components/PageNavigation/PageNavigation'

import styles from './NoMatch.module.scss'

const NoMatch = () => {
  return (
    <>
      <div className={styles.container}>
        Страница не найдена
        <Link to='/'>Home</Link>
        <PageNavigation />
      </div>
    </>
  )
}

export default NoMatch
