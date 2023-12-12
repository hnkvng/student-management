import React, { useState } from 'react';
import styles from './main.module.css';
import TableSlice from './TableSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentIdClasses } from '../../../redux/selectors';

function ShowIcon({ icon, target, ClassName, id }) {
    const dispatch = useDispatch();
    const setTarget = TableSlice.actions.setTargetDelete;
    const setOpenClass = TableSlice.actions.setOpenClass;
    const ClassId = useSelector(getCurrentIdClasses);
    const handleDeleteStudent = () => {
        dispatch(
            setTarget({
                title: `Xóa ${target}`,
                show: true,
                des: `Bạn có muốn xóa sinh viên này không!`,
                idStudent: id,
                idClass: ClassId,
                nameButton: 'Xóa',
                theme: 'danger',
                method: 'handleDeleteStudent',
            }),
        );
    };
    const handleDeleteClass = () => {
        dispatch(
            setTarget({
                title: `Xóa ${target}`,
                show: true,
                des: `Bạn có muốn xóa Lớp ${ClassName}!`,
                idClass: ClassId,
                nameButton: 'Xóa',
                theme: 'danger',
                method: 'handleDeleteClass',
            }),
        );
    };
    const handleEditClass = () => {
        dispatch(setOpenClass(true));
        dispatch(
            setTarget({
                title: `Thay đổi ${target}`,
                show: true,
                des: `Nhập mã lớp mới cho  ${ClassName}!`,
                idClass: ClassId,
                nameButton: 'chỉnh',
                method: 'handleEditClass',
            }),
        );
    };
    switch (icon.name) {
        case 'edit':
            switch (target) {
                case 'Lớp học':
                    return (
                        <i
                            className={icon.class}
                            id={styles.icon}
                            style={icon.style}
                            onClick={handleEditClass}
                        ></i>
                    );
                case 'Sinh viên':
                    return (
                        <Link to={`/student/${id}/edit`}>
                            <i
                                className={icon.class}
                                id={styles.icon}
                                style={icon.style}
                            ></i>
                        </Link>
                    );
                default:
                    console.error('Target invalid');
                    break;
            }
            break;
        case 'delete':
            switch (target) {
                case 'Lớp học':
                    return (
                        <i
                            className={icon.class}
                            id={styles.icon}
                            style={icon.style}
                            onClick={handleDeleteClass}
                        ></i>
                    );
                case 'Sinh viên':
                    return (
                        <i
                            className={icon.class}
                            id={styles.icon}
                            style={icon.style}
                            onClick={handleDeleteStudent}
                        ></i>
                    );
                default:
                    console.error('Target invalid');
                    break;
            }
            break;
        default:
            break;
    }
}
export default ShowIcon;
