import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import TableSlice from './TableSlice';
import { getCheckAll, getListCheckBox } from '../../../redux/selectors';
import { context } from './body';
function CheckBox({ all }) {
    const dispatch = useDispatch();
    const idStudent = useContext(context);
    const changeListCheck = TableSlice.actions.setListCheckBox;
    const checkAll = TableSlice.actions.setCheckAll;
    const listCheck = useSelector(getListCheckBox);
    const check = useSelector(getCheckAll);
    const hanleCheckAll = (e) => {
        dispatch(checkAll(e.target.checked));
        const updatedList = listCheck.map((item) => {
            return { ...item, check: e.target.checked };
        });
        dispatch(changeListCheck(updatedList));
    };
    const hanleCheck = (e) => {
        const updatedList = listCheck.map((item) =>
            item.target === idStudent
                ? { ...item, check: e.target.checked }
                : item,
        );
        dispatch(changeListCheck(updatedList));
    };
    const hanleRef = (e) => {
        if (e)
            listCheck.forEach((item) => {
                if (item.target === idStudent) {
                    e.checked = item.check;
                }
            });
    };
    if (all) {
        return (
            <>
                <input
                    checked={check}
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={hanleCheckAll}
                ></input>
                <label className={styles.checkbox_all}>{all}</label>
            </>
        );
    }
    return (
        <input
            ref={hanleRef}
            type="checkbox"
            className={styles.checkbox}
            onChange={hanleCheck}
        ></input>
    );
}

export default CheckBox;
