import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.css';
import { useDispatch } from 'react-redux';
import FormSlice from './FormSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

function FormInput({
    add,
    edit,
    student,
    info,
    log,
    style,
    status,
    id,
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
    const [formStudent, setFormStudent] = useState(form);
    const target = useRef();
    const nav = useNavigate();
    const classFormGroup = clsx('mb-3', [styles.form_group]);
    const dipatch = useDispatch();
    const reset = FormSlice.actions.resetinitialState;
    const check = FormSlice.actions.checkData;
    const enter = FormSlice.actions.enterStudent;
    const clear = FormSlice.actions.clearStudent;
    const set = FormSlice.actions.setInfo;
    const addinfoError = FormSlice.actions.addInfoError;
    const deleteInfoError = FormSlice.actions.deleteInfoError;
    const setTime = () => {
        if (log === '') {
            const id = setTimeout(() => {
                dipatch(set());
            }, 4000);
            setIdTimeOut(id);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormStudent({ ...formStudent, [name]: value });
        dipatch(check({ name: name, value: value }));
        dipatch(deleteInfoError({ name: name }));
    };
    const handleSubmit = (e) => {
        setTime();
        e.preventDefault();
        dipatch(addinfoError());
        if (Object.values(status).includes(false)) return;
        dipatch(method(formStudent));
    };
    const handleKeydown = (e) => {
        if (e.keyCode === 190) {
            const { name, value } = e.target;
            if (value[2] !== '0' && value[1] !== '0')
                setFormStudent({ ...formStudent, [name]: value + '.0' });
        }
    };
    const handleClear = () => {
        setTime();
        dipatch(clear({ form, id }));
        setFormStudent(student);
        target.current.focus();
    };
    useEffect(() => {
        dipatch(enter(formStudent));
    }, [formStudent, dipatch, enter]);
    useEffect(() => {
        dipatch(reset());
        target.current.focus();
    }, [dipatch, reset]);
    useEffect(() => {
        setFormStudent(student);
    }, [student]);
    useEffect(() => {
        if (edit || add) {
            setFormStudent(form);
            target.current.focus();
        }
        if (edit) setTimeout(() => nav('/student'), 1500);
    }, [add, edit]);
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
                <small style={{ color: 'red' }}>{info.MSSV}</small>
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
                <small style={{ color: 'red' }}>{info.Name}</small>
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
                <small style={{ color: 'red' }}>{info.Birth}</small>
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
                <small style={{ color: 'red' }}>{info.Faculty}</small>
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
                <small style={{ color: 'red' }}>{info.QT}</small>
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
                <small style={{ color: 'red' }}>{info.GK}</small>
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
                <small style={{ color: 'red' }}>{info.CK}</small>
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
                <small style={{ color: 'red' }}>{info.Class}</small>
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
