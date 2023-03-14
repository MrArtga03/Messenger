import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styles from './TextArea.module.scss'

const TextArea = () => {
  const [value, setValue] = useState('');

  return(
    <div className={styles.input} >
      <ReactQuill theme="snow" value={value} onChange={setValue}/>
    </div>
  ) 
};

export default TextArea