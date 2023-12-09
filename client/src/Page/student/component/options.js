import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import TableClice from './TableSlice';
import { getOptionCurrent } from '../../../redux/selectors';
function Option({ ClassName }) {
    const dispatch = useDispatch();
    const setIcon = TableClice.actions.appearIcon;
    const setOption = TableClice.actions.setOptionCurrent;
    const optionCurrent = useSelector(getOptionCurrent);
    const [select, setSelect] = useState(optionCurrent);
    const handleSelect = (e) => {
        setSelect(e.target.value);
        dispatch(setOption(e.target.value));
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
    useEffect(() => {
        console.log(optionCurrent);
    });
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
