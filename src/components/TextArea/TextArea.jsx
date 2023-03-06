import {Editor} from 'draft-js';

import styles from './TextArea.module.scss'

const TextArea = ({editorState, setEditorState, keyBindingFn, handleReturn, handleKeyCommand}) => {

  return(
    <div className={styles.input}>
      <Editor
        editorState={editorState} 
        onChange={setEditorState} 
        keyBindingFn={keyBindingFn}
        placeholder='Enter message'
        handleReturn={handleReturn}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  ) 
};

export default TextArea