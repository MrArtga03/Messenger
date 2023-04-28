import AuthContent from '../AuthContent/AuthContent'
import PageNavigation from '../../components/PageNavigation/PageNavigation'

import styles from './AuthPage.module.scss'

const AuthPage = () => {
  return (
    <section className={styles.container}>
      <PageNavigation />
      <div>
        <AuthContent />
      </div>
    </section>
  )
}

export default AuthPage
