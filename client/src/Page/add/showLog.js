import React from 'react';
import styles from './component/Form/main.module.css';
import Log from '../../log/log';
function ShowLog({ log }) {
    return (
        log !== '' && (
            <div id={styles.toast}>
                <Log {...log}></Log>
            </div>
        )
    );
}
export default ShowLog;
