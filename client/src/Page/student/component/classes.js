import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiClasses } from './TableSlice';
import {
    getInfoClasses,
    getCurrentIdClasses,
    getEditClass,
} from '../../../redux/selectors';
import TableSlice from './TableSlice';
import styles from './main.module.css';
import Form from 'react-bootstrap/Form';
function Class() {
    const dispatch = useDispatch();
    const get = TableSlice.actions.getNameClasses;
    const reset = TableSlice.actions.resetIcon;
    const dataClasses = useSelector(getInfoClasses);
    const ClassId = useSelector(getCurrentIdClasses);
    const editClass = useSelector(getEditClass);
    const [selection, setSelection] = useState(ClassId);
    const handleSelect = (e) => {
        if (e.target.value === '') dispatch(reset());
        dispatch(get(e.target.value));
        setSelection(e.target.value);
    };
    useEffect(() => {
        dispatch(getApiClasses());
        if (editClass) dispatch(getApiClasses());
    }, [dispatch, editClass]);
    return (
        <Form.Select
            className={styles.selection}
            value={selection}
            onChange={handleSelect}
        >
            <option value="">Chọn lớp</option>
            {dataClasses.map((element, index) => (
                <option key={index} value={element._id}>
                    Lớp/{element.Name}
                </option>
            ))}
        </Form.Select>
    );
}

export default Class;
