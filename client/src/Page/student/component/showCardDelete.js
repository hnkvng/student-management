import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import {
    getShowDeleteStudent,
    getCurrentIdClasses,
    getShowDeleteClass,
} from '../../../redux/selectors';
import { useDispatch } from 'react-redux';
import TableSlice from './TableSlice';
import { deleteStudent } from './TableSlice';
import { deleteClass } from './TableSlice';
function Card({ target, des, id }) {
    const dispatch = useDispatch();
    const showStudent = useSelector(getShowDeleteStudent);
    const showClass = useSelector(getShowDeleteClass);
    const ClassId = useSelector(getCurrentIdClasses);
    const setShowStudent = TableSlice.actions.setShowDeleteStudent;
    const setShowClass = TableSlice.actions.setShowDeleteClass;
    let handleDe = null;
    let handleCl = null;
    if (target === 'Sinh viên') {
        const handleDelete = () => {
            dispatch(deleteStudent({ classroomId: ClassId, studentId: id }));
            dispatch(setShowStudent(false));
        };
        const handleClose = () => dispatch(setShowStudent(false));
        handleDe = handleDelete;
        handleCl = handleClose;
    }
    if (target === 'Lớp học') {
        const handleDelete = () => {
            dispatch(deleteClass({ classroomId: ClassId }));
            dispatch(setShowClass(false));
        };
        const handleClose = () => dispatch(setShowClass(false));
        handleDe = handleDelete;
        handleCl = handleClose;
    }
    return (
        <Modal show={showStudent || showClass} onHide={handleCl}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa {target} </Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc muốn xóa {des} !</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDe}>
                    Xóa
                </Button>
                <Button variant="secondary" onClick={handleCl}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Card;
