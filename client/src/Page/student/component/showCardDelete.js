import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import TableSlice from './TableSlice';
import { deleteStudent } from './TableSlice';
import { deleteClass } from './TableSlice';

function Card({ des, name, method, show, idStudent, idClass }) {
    const dispatch = useDispatch();
    const setTarget = TableSlice.actions.setTargetDelete;
    const handleDeleteStudent = () => {
        dispatch(deleteStudent({ classroomId: idClass, studentId: idStudent }));
        dispatch(setTarget({ name: '', show: false, des: '', method: null }));
    };
    const handleDeleteClass = () => {
        dispatch(deleteClass({ classroomId: idClass }));
        dispatch(setTarget({ name: '', show: false, des: '', method: null }));
    };
    const handleClose = () =>
        dispatch(setTarget({ name: '', show: false, des: '', method: '' }));
    const hanle = (method) => {
        if (method === 'handleDeleteClass') {
            handleDeleteClass();
        }
        if (method === 'handleDeleteStudent') {
            handleDeleteStudent();
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa {name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>{des}!</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => hanle(method)}>
                    Xóa
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Card;
