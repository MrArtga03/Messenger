import PropTypes from 'prop-types'
import React, { memo, useEffect, useState } from 'react'
import { Avatar, Box, Wrap, WrapItem } from '@chakra-ui/react'

import FormButton from '../UI/FormButton/FormButton'
import ReactionsList from '../ReactionsList/ReactionsList'
import Reaction from '../Reaction/Reaction'
import SmileReaction from '../../assets/svg/SmileReaction.svg'
import { userGalkin, userKourin, userSolovyov } from '../../constants/urls'

import styles from './Message.module.scss'
const Message = props => {
  const { message, isOwner, time, onMouseDown, onContextMenu, editedText } =
    props

  const [isHover, setIsHover] = useState(false)
  const [isReaction, setIsReaction] = useState(false)
  const [selectedReaction, setSelectedReaction] = useState(null)
  const smilesRegex = /^[\uD83C-\uDBFF\uDC00-\uDFFF]+$/
  const containsOnlySmiles = message && smilesRegex.test(message.trim())

  const users = [
    { name: 'Artyom Derbin', image: '' },
    { name: 'Artyom Galkin', image: userGalkin },
    { name: 'Ivan Solovyov', image: userSolovyov },
    { name: 'Kourin Daniel', image: userKourin },
  ]
  const [avatarIndex, setAvatarIndex] = useState(null)

  useEffect(() => {
    setAvatarIndex(Math.floor(Math.random() * users.length))
  }, [])

  const handleSelectReaction = reaction => {
    setSelectedReaction(reaction)
  }

  const handleChangeReaction = () => {
    setSelectedReaction(null)
  }

  return (
    <Box className={styles['container-message']}>
      <Wrap
        className={
          isOwner === 1
            ? styles['wrapper-image-opponent']
            : styles['wrapper-image']
        }
      >
        <WrapItem>
          <Avatar
            name={users[avatarIndex]?.name}
            src={users[avatarIndex]?.image}
          />
        </WrapItem>
      </Wrap>
      <section
        onMouseDown={onMouseDown}
        onContextMenu={onContextMenu}
        className={
          isOwner === 0
            ? styles['my-message-box']
            : styles['opponent-message-box']
        }
      >
        <div
          onMouseOver={() => {
            setIsHover(true)
          }}
          onMouseLeave={() => {
            setIsHover(false)
            setIsReaction(false)
          }}
          className={styles.container}
        >
          <div className={!containsOnlySmiles && styles.polygon} />
          <div
            className={
              isOwner === 0
                ? containsOnlySmiles
                  ? styles['my-box-context-smiles']
                  : styles['my-box-context']
                : containsOnlySmiles
                ? styles['opponent-box-context-smiles']
                : styles['opponent-box-context']
            }
          >
            <span
              className={
                isOwner === 1
                  ? containsOnlySmiles
                    ? styles['name-user-smile']
                    : styles['name-user']
                  : null
              }
            >
              {isOwner === 1 ? users[avatarIndex]?.name : ''}
            </span>
            <span
              dangerouslySetInnerHTML={{ __html: message }}
              className={
                isOwner === 0
                  ? styles['my-context-message']
                  : styles['opponent-context-message']
              }
            ></span>
            <span
              className={
                isOwner === 0
                  ? styles['my-context-time']
                  : styles['opponent-context-time']
              }
            >
              {time}
              {editedText}
            </span>
          </div>
          <FormButton
            onClick={() => {
              setIsReaction(!isReaction)
            }}
            className={
              isHover
                ? styles['reaction-message']
                : styles['reaction-message_none']
            }
          >
            <img src={SmileReaction} alt={'Reaction Message'} />
          </FormButton>

          {isReaction && (
            <ReactionsList onSelectReaction={handleSelectReaction} />
          )}
        </div>
        {selectedReaction && (
          <Reaction onClick={handleChangeReaction}>{selectedReaction}</Reaction>
        )}
      </section>
    </Box>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  isOwner: PropTypes.number,
  time: PropTypes.string,
  onMouseDown: PropTypes.func,
  onContextMenu: PropTypes.func,
  editedText: PropTypes.string,
}

export default memo(Message)
