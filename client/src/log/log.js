import React from 'react';
import styles from './main.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import LogSlice from './LogSlice';
function Log({ info, des, icon, theme }) {
    const containerClass = clsx(styles.toast, theme);
    const dipatch = useDispatch();
    const set = LogSlice.actions.setInfo;
    const setLogNull = LogSlice.actions.setLogNull;
    const handleClose = () => {
        dipatch(set());
        dipatch(setLogNull());
    };
    return (
        <div className={containerClass}>
            <div className={styles.toast_icon}>
                <i className={icon}></i>
            </div>
            <div className={styles.toast_body}>
                <h5 className={styles.toast_title}>{info}</h5>
                <p className={styles.toast_msg}>{des}</p>
            </div>
            <div className={styles.toast_close} onClick={handleClose}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
}

export default Log;
