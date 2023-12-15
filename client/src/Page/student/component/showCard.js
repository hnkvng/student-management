import React, { useEffect, useState, useRef } from 'react';
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
    getTestClass,
    getEditClass,
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
    const [idTimeOut, setIdTimeOut] = useState(null);
    const [ClassId, setClassId] = useState('');
    const input = useRef();

    const dispatch = useDispatch();

    const setLog = LogSlice.actions.setLog;
    const desploy = LogSlice.actions.desploy;

    const setTableNull = TableSlice.actions.setLogNull;
    const setOpenClass = TableSlice.actions.setOpenClass;
    const setTarget = TableSlice.actions.setTargetDelete;
    const setNewClass = TableSlice.actions.setNewClass;

    const logTable = useSelector(getLogTable);
    const newNameClass = useSelector(getNewNameClass);
    const openClass = useSelector(getOpenClass);
    const testClass = useSelector(getTestClass);
    const edit = useSelector(getEditClass);

    const setTime = () => {
        const id = setTimeout(() => {
            dispatch(desploy());
        }, 4000);
        setIdTimeOut(id);
    };

    const handleInputClass = (e) => {
        const newClass = e.target.value;
        dispatch(setNewClass({ newClass: newClass }));
        setClassId(e.target.value);
    };
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
        dispatch(editClass({ classroomId: idClass, Classroom: newNameClass }));
    };
    const handleClose = () => {
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
    };
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
        if (openClass) input.current.focus();
    }, [openClass]);
    useEffect(() => {
        if (edit) {
            dispatch(setOpenClass(false));
            dispatch(
                setTarget({
                    title: '',
                    show: false,
                    des: '',
                    method: '',
                    nameButton: '',
                }),
            );
            setClassId('');
        }
    }, [edit]);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {des}
                {openClass && (
                    <p>
                        <input
                            type="text"
                            maxLength={255}
                            ref={input}
                            value={ClassId}
                            onChange={handleInputClass}
                        ></input>
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={theme}
                    onClick={() => hanle(method)}
                    disabled={testClass}
                >
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
