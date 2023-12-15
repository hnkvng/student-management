import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import TableSlice from './TableSlice';
import { getListCheckBox } from '../../../redux/selectors';

function CheckBox({ all, listCheckBox }) {
    const dispatch = useDispatch();
    const setCheckAll = TableSlice.actions.setCheckAll;
    const hanleCheckAll = (e) => {
        dispatch(setCheckAll(e.target.checked));
    };
    const hanleCheck = (e) => {
        listCheckBox.forEach((ele) => {
            if (ele.target === e.target) ele.check = e.target.checked;
        });
    };
    if (all) {
        return (
            <>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    name="checkAll"
                    onChange={hanleCheckAll}
                ></input>
                <label className={styles.checkbox_all}>{all}</label>
            </>
        );
    }
    return (
        <input
            ref={(e) => listCheckBox.push({ target: e, check: e.checked })}
            type="checkbox"
            className={styles.checkbox}
            name="check"
            onChange={hanleCheck}
        ></input>
    );
}

export default CheckBox;
