import React, { useState } from 'react';
import styles from './main.module.css';
import TableSlice from './TableSlice';
import { useDispatch } from 'react-redux';
import Card from './showCardDelete';
import { Link } from 'react-router-dom';

function ShowIcon({ icon, target, ClassName, id }) {
    const dispatch = useDispatch();
    const setShowStudent = TableSlice.actions.setShowDeleteStudent;
    const setShowClass = TableSlice.actions.setShowDeleteClass;
    const handleOnclickIconStudent = () => {
        dispatch(setShowStudent(true));
    };
    const handleOnclickIconClass = () => {
        dispatch(setShowClass(true));
    };
    if (icon.name === 'delete') {
        return (
            <>
                <Card target={target} id={id}></Card>
                <i
                    className={icon.class}
                    id={styles.icon}
                    style={icon.style}
                    onClick={handleOnclickIconStudent || handleOnclickIconClass}
                ></i>
            </>
        );
    }
    if (icon.name === 'edit') {
        if (target === 'Lớp học') return;
        if (target === 'Sinh viên')
            return (
                <Link to={`/student/${id}/edit`}>
                    <i
                        className={icon.class}
                        id={styles.icon}
                        style={icon.style}
                    ></i>
                </Link>
            );
    }
}
export default ShowIcon;
