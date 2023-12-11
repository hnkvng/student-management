import React from 'react';
import Log from './log';
import styles from './main.module.css';
function ShowLog({ log }) {
    return log.map((ele, index) => (
        <div key={index} id={styles.toast}>
            <Log {...ele.target}></Log>
        </div>
    ));
}
export default ShowLog;
