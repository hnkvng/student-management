import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiClasses } from './TableSlice';
import { getInfoClasses } from '../../../redux/selectors';
import TableClice from './TableSlice';
import styles from './main.module.css';
import Form from 'react-bootstrap/Form';
function Class() {
    const dipatch = useDispatch();
    const get = TableClice.actions.getNameClasses;
    const dataClasses = useSelector(getInfoClasses);
    const handleSelection = (e) => {
        dipatch(get(e.target.value));
    };
    useEffect(() => {
        dipatch(getApiClasses());
    }, [dipatch]);
    return (
        <Form.Select className={styles.selection} onClick={handleSelection}>
            <option value="Tổng hợp">
                Tổng hợp | số lớp : {dataClasses.length}
            </option>
            {dataClasses.map((element, index) => (
                <option key={index} value={element._id}>
                    Lớp/{element.Name}
                </option>
            ))}
        </Form.Select>
    );
}

export default Class;
