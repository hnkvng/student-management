import React, { useState } from 'react';
import styles from './main.module.css';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import TableClice from './TableSlice';
import { getIconCurrent } from '../../../redux/selectors';
function Option() {
    const dispatch = useDispatch();
    const setIcon = TableClice.actions.appearIcon;
    const iconCurrent = useSelector(getIconCurrent);
    const [select, setSelect] = useState(iconCurrent);
    const handleSelect = (e) => {
        setSelect(e.target.value);
        const listIcon = {
            delete: {
                class: 'fa-solid fa-trash',
                style: { color: 'red' },
            },
            edit: {
                class: 'fa-solid fa-pen-to-square',
                style: { color: 'blue' },
            },
        };
        if (e.target.value === '')
            return dispatch(setIcon({ name: null, value: null }));
        const icon = Object.entries(listIcon).find(
            (item) => item[0] === e.target.value,
        )[1];
        dispatch(setIcon(icon));
    };
    return (
        <Form.Select
            className={styles.select_option}
            value={select}
            onChange={handleSelect}
        >
            <option value="">Hành động</option>
            <option value="delete">Xóa</option>
            <option value="edit">Chỉnh sửa</option>
        </Form.Select>
    );
}
export default Option;
