import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import TableSlice, {
    deleteStudent,
    deleteClass,
    editClass,
} from './TableSlice';
import {
    getLogTable,
    getNewNameClass,
    getOpenClass,
} from '../../../redux/selectors';
import LogSlice from '../../../log/LogSlice';
import { useSelector } from 'react-redux';

function Card({
    des,
    title,
    show,
    nameButton,
    theme,
    idStudent,
    idClass,
    method,
}) {
    const setTime = () => {
        const id = setTimeout(() => {
            dispatch(desploy());
        }, 4000);
        setIdTimeOut(id);
    };
    const [idTimeOut, setIdTimeOut] = useState(null);
    const input = <input type="text" maxLength={255}></input>;
    const setLog = LogSlice.actions.setLog;
    const desploy = LogSlice.actions.desploy;
    const setTableNull = TableSlice.actions.setLogNull;
    const setOpenClass = TableSlice.actions.setOpenClass;
    const logTable = useSelector(getLogTable);
    const newNameClass = useSelector(getNewNameClass);
    const openClass = useSelector(getOpenClass);
    const dispatch = useDispatch();
    const setTarget = TableSlice.actions.setTargetDelete;
    const handleDeleteStudent = () => {
        setTime();
        dispatch(deleteStudent({ classroomId: idClass, studentId: idStudent }));
        dispatch(
            setTarget({
                name: '',
                show: false,
                des: '',
                method: '',
                nameButton: '',
            }),
        );
    };
    const handleDeleteClass = () => {
        setTime();
        dispatch(deleteClass({ classroomId: idClass }));
        dispatch(
            setTarget({
                title: '',
                show: false,
                des: '',
                method: '',
                nameButton: '',
            }),
        );
    };
    const handleEditClass = () => {
        setTime();
        dispatch(
            editClass({ classroomId: idClass, newClassroom: newNameClass }),
        );
        dispatch(setOpenClass(false));
    };
    const handleClose = () =>
        dispatch(
            setTarget({
                title: '',
                show: false,
                des: '',
                method: '',
                nameButton: '',
            }),
        );
    dispatch(setOpenClass(false));
    const hanle = (method) => {
        switch (method) {
            case 'handleDeleteClass':
                handleDeleteClass();
                break;
            case 'handleDeleteStudent':
                handleDeleteStudent();
                break;
            case 'handleEditClass':
                handleEditClass();
                break;
            default:
                console.error('Method invalid');
                break;
        }
    };
    useEffect(() => {
        if (logTable !== '') {
            dispatch(setLog({ target: logTable, timeId: idTimeOut }));
            dispatch(setTableNull());
        }
    }, [logTable]);
    useEffect(() => {
        console.log(openClass);
    });
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {des}
                {openClass && input}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={theme} onClick={() => hanle(method)}>
                    {nameButton}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Card;
