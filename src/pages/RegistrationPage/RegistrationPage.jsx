import PageNavigation from '../../components/PageNavigation/PageNavigation'
import RegContent from '../RegContent/RegContent'

import styles from './RegistrationPage.module.scss'

const RegistrationPage = () => {
  return (
    <section className={styles.container}>
      <PageNavigation />
      <div>
        <RegContent />
      </div>
    </section>
  )
}

export default RegistrationPage
