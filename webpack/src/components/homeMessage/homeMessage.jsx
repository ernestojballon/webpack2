import React from 'react';
import styles from './homeMessage.module.css';
import '../../main.css'; // Assuming global CSS needs to be applied

function HomeMessage() {
  return <div >
    <div className={styles.someClass}>
      Home message@@@@!!!
    </div>
    <div className="someClassFromMain">
      main 
    </div>
  </div>;
}

export default HomeMessage;