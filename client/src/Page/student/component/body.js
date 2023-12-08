import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiStudent } from './TableSlice';
import {
    getInfoStudent,
    getCurrentIdClasses,
    getIconCurrent,
} from '../../../redux/selectors';
import styles from './main.module.css';
import CheckBox from './checkbox';
import { Link } from 'react-router-dom';

function Body() {
    const dispatch = useDispatch();
    const dataStudent = useSelector(getInfoStudent);
    const id = useSelector(getCurrentIdClasses);
    const icon = useSelector(getIconCurrent);
    useEffect(() => {
        dispatch(getApiStudent(id));
    }, [dispatch, id]);
    return dataStudent.map((data, index) => (
        <tr key={index}>
            <td>
                {icon.class === 'fa-solid fa-trash' ? (
                    <CheckBox></CheckBox>
                ) : null}
                {icon.class !== undefined ? (
                    <Link to={`/student/${data._id}/edit`}>
                        <i
                            className={icon.class}
                            id={styles.icon}
                            style={icon.style}
                        ></i>
                    </Link>
                ) : null}
                {index + 1}
            </td>
            <td>{data.MSSV}</td>
            <td>{data.Name}</td>
            <td>{data.Birth}</td>
            <td>{data.Faculty}</td>
            <td>{data.QT}</td>
            <td>{data.GK}</td>
            <td>{data.CK}</td>
            <td>{data.TB}</td>
        </tr>
    ));
}

export default Body;
