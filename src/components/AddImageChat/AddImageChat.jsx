import PropTypes from 'prop-types'
import { Image } from '@chakra-ui/react'

import { defaultImage } from '../../constants/urls'

import styles from './AddImageChat.module.scss'

const AddImageChat = ({ onChange, imageURL }) => {
  return (
    <form className={styles['form-add-image']}>
      <div className={styles['input-wrapper']}>
        <input
          onChange={onChange}
          className={styles['upload-image']}
          id={'file-loader-button'}
          type={'file'}
          accept={'image/*'}
          capture={'camera'}
        />
      </div>
      <Image
        className={styles['chat-message']}
        src={imageURL ? imageURL : defaultImage}
        boxSize='170px'
        borderRadius='full'
        alt='preview'
      />
    </form>
  )
}

AddImageChat.propTypes = {
  onChange: PropTypes.func,
  imageURL: PropTypes.string,
}

export default AddImageChat
