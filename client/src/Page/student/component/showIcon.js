import React from 'react';
import styles from './main.module.css';
import TableSlice from './TableSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentIdClasses } from '../../../redux/selectors';

function ShowIcon({ icon, target, ClassName, id }) {
    const dispatch = useDispatch();
    const setTarget = TableSlice.actions.setTargetDelete;
    const ClassId = useSelector(getCurrentIdClasses);
    const handleOnclick = () => {
        if (target === 'Lớp học')
            dispatch(
                setTarget({
                    name: target,
                    show: true,
                    des: `Bạn có muốn xóa Lớp ${ClassName}!`,
                    idClass: ClassId,
                    method: 'handleDeleteClass',
                }),
            );
        if (target === 'Sinh viên')
            dispatch(
                setTarget({
                    name: target,
                    show: true,
                    des: `Bạn có muốn xóa sinh viên này không!`,
                    idStudent: id,
                    idClass: ClassId,
                    method: 'handleDeleteStudent',
                }),
            );
    };
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
    if (icon.name === 'delete') {
        return (
            <>
                <i
                    className={icon.class}
                    id={styles.icon}
                    style={icon.style}
                    onClick={handleOnclick}
                ></i>
            </>
        );
    }
}
export default ShowIcon;
