import React from 'react';
import styles from './main.module.css';

function CheckBox({ all }) {
    return (
        <>
            <input type="checkbox" className={styles.checkbox}></input>
            <label className={styles.checkbox_all}>{all}</label>
        </>
    );
}

export default CheckBox;
