import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.css';
import { useDispatch } from 'react-redux';
import FormSlice from './FormSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import LogSlice from '../../../../log/LogSlice';

function FormInput({
    add,
    edit,
    student,
    error,
    log,
    logForm,
    style,
    status,
    idTimeOut,
    nameButton,
    button,
    method,
    setIdTimeOut,
}) {
    const form = {
        MSSV: '',
        Name: '',
        Birth: '',
        Faculty: '',
        QT: '',
        GK: '',
        CK: '',
        Class: '',
    };
    const setTime = () => {
        if (log === '') {
            const id = setTimeout(() => {
                dispatch(set());
                dispatch(setLogNull());
                dispatch(setFormLogNull());
            }, 4000);
            setIdTimeOut(id);
        }
    };
    const [formStudent, setFormStudent] = useState(form);
    const target = useRef();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const classFormGroup = clsx('mb-3', [styles.form_group]);
    const reset = FormSlice.actions.resetinitialState;
    const check = FormSlice.actions.checkData;
    const enter = FormSlice.actions.enterStudent;
    const clear = FormSlice.actions.clearStudent;
    const set = LogSlice.actions.setInfo;
    const setLogNull = LogSlice.actions.setLogNull;
    const setIdTime = LogSlice.actions.setIdTime;
    const setLog = LogSlice.actions.setLog;
    const setFormLogNull = FormSlice.actions.setLogNull;
    const setAddorEdit = FormSlice.actions.setAddorEdit;
    const addinfoError = FormSlice.actions.addInfoError;
    const deleteInfoError = FormSlice.actions.deleteInfoError;
    //handle data when user change input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormStudent({ ...formStudent, [name]: value });
        dispatch(check({ name: name, value: value }));
        dispatch(deleteInfoError({ name: name }));
    };
    //submit data form into database
    const handleSubmit = (e) => {
        setTime();
        e.preventDefault();
        dispatch(addinfoError());
        if (Object.values(status).includes(false)) return;
        dispatch(method(formStudent));
        dispatch(setIdTime(idTimeOut));
    };
    //add .0 after user click entry '.'
    const handleKeydown = (e) => {
        if (e.keyCode === 190) {
            const { name, value } = e.target;
            if (value[2] !== '0' && value[1] !== '0')
                setFormStudent({ ...formStudent, [name]: value + '.0' });
        }
    };
    //clear data form
    const handleClear = () => {
        setTime();
        dispatch(clear(form));
        setFormStudent(student);
        dispatch(setIdTime(idTimeOut));
        target.current.focus();
    };
    //update data form
    useEffect(() => {
        dispatch(enter(formStudent));
    }, [formStudent, dispatch, enter]);
    //reset data form
    useEffect(() => {
        dispatch(reset());
        target.current.focus();
    }, [dispatch, reset]);
    //edit student
    useEffect(() => {
        setFormStudent(student);
    }, [student]);
    //clear after add or edit complete
    useEffect(() => {
        if (edit || add) {
            dispatch(setLog(logForm));
            setFormStudent(form);
            target.current.focus();
            dispatch(setAddorEdit());
        }
        if (edit) setTimeout(() => nav('/student'), 1500);
    }, [add, edit]);
    useEffect(() => {
        dispatch(setLog(logForm));
    }, [logForm]);
    return (
        <Form action="/student" className={styles.form}>
            <Form.Group className={classFormGroup}>
                <Form.Label>Mã số sinh viên</Form.Label>
                <Form.Control
                    type="text"
                    name="MSSV"
                    value={formStudent.MSSV}
                    onChange={handleInputChange}
                    maxLength={255}
                    ref={target}
                    style={style.MSSV}
                />
                <small style={{ color: 'red' }}>{error.MSSV}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Họ và tên sinh viên</Form.Label>
                <Form.Control
                    type="text"
                    name="Name"
                    value={formStudent.Name}
                    onChange={handleInputChange}
                    maxLength={255}
                    style={style.Name}
                />
                <small style={{ color: 'red' }}>{error.Name}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                    type="date"
                    name="Birth"
                    value={formStudent.Birth}
                    onChange={handleInputChange}
                    style={style.Birth}
                />
                <small style={{ color: 'red' }}>{error.Birth}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Khoa</Form.Label>
                <Form.Control
                    type="text"
                    name="Faculty"
                    value={formStudent.Faculty}
                    onChange={handleInputChange}
                    maxLength={255}
                    style={style.Faculty}
                />
                <small style={{ color: 'red' }}>{error.Faculty}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Điểm quá trình</Form.Label>
                <Form.Control
                    type="text"
                    name="QT"
                    value={formStudent.QT}
                    onChange={handleInputChange}
                    maxLength={3}
                    onKeyDown={handleKeydown}
                    style={style.QT}
                />
                <small style={{ color: 'red' }}>{error.QT}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Điểm giữa kì</Form.Label>
                <Form.Control
                    type="text"
                    name="GK"
                    value={formStudent.GK}
                    onChange={handleInputChange}
                    maxLength={3}
                    onKeyDown={handleKeydown}
                    style={style.GK}
                />
                <small style={{ color: 'red' }}>{error.GK}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Điểm cuối kì</Form.Label>
                <Form.Control
                    type="text"
                    name="CK"
                    value={formStudent.CK}
                    onChange={handleInputChange}
                    maxLength={3}
                    onKeyDown={handleKeydown}
                    style={style.CK}
                />
                <small style={{ color: 'red' }}>{error.CK}</small>
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Mã lớp</Form.Label>
                <Form.Control
                    type="text"
                    name="Class"
                    value={formStudent.Class}
                    onChange={handleInputChange}
                    maxLength={255}
                    style={style.Class}
                />
                <small style={{ color: 'red' }}>{error.Class}</small>
            </Form.Group>
            <div className={styles.costumebutton}>
                <Button
                    variant="primary"
                    className={styles.customs_button}
                    type="submit"
                    disabled={button.submit}
                    onClick={handleSubmit}
                >
                    {nameButton}
                </Button>
                <Button
                    variant="primary"
                    className={styles.customs_button}
                    onClick={handleClear}
                    disabled={button.clear}
                >
                    Dọn
                </Button>
            </div>
        </Form>
    );
}
export default FormInput;
