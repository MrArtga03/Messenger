import { Image } from '@chakra-ui/react'

import styles from './AddImageChat.module.scss'

const AddImageChat = ({ onChange, file, imageURL }) => {
  return (
    <form className={styles['form-add-image']}>
      <div className={styles['input-wrapper']}>
        <input
          onChange={onChange}
          className={styles['upload-image']}
          id={'file-loader-button'}
          type={'file'}
        />
      </div>
      <Image
        className={styles['chat-message']}
        src={
          imageURL
            ? imageURL
            : 'https://media.istockphoto.com/id/1392182937/zh/%E5%90%91%E9%87%8F/no-image-available-photo-coming-soon.jpg?s=612x612&w=0&k=20&c=Ot9bY5dAFt9KaAIJHv5sKhU88-Hn89XEJzuD1TwuV8Q='
        }
        boxSize='170px'
        borderRadius='full'
        alt='preview'
      />
    </form>
  )
}

export default AddImageChat
