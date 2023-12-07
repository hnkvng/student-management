import React from 'react';
import styles from './main.module.css';
import clsx from 'clsx';
import FormSlice from '../Page/add/component/Form/FormSlice';
import { useDispatch } from 'react-redux';
function Log({ info, des, icon, theme }) {
    const containerClass = clsx(styles.toast, theme);
    const dipatch = useDispatch();
    const set = FormSlice.actions.setInfo;
    const handleDelete = () => {
        dipatch(set());
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
            <div className={styles.toast_close} onClick={handleDelete}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    );
}

export default Log;
