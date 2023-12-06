import React, { useEffect, useRef, useState } from 'react';
import styles from './main.module.css';
import { useDispatch } from 'react-redux';
import FormSlice from './FormSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addStudent } from './FormSlice';
import clsx from 'clsx';

function FormInput({ info, style, status, button }) {
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
    const classFormGroup = clsx('mb-3', [styles.form_group]);
    const dipatch = useDispatch();
    const check = FormSlice.actions.checkData;
    const enter = FormSlice.actions.enterStudent;
    const clear = FormSlice.actions.clearStudent;
    const popL = FormSlice.actions.popLog;
    const addinfoError = FormSlice.actions.addInfoError;
    const deleteInfoError = FormSlice.actions.deleteInfoError;
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormStudent({ ...formStudent, [name]: value });
        dipatch(check({ name: name, value: value }));
        dipatch(deleteInfoError({ name: name }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dipatch(addinfoError());
        if (Object.values(status).includes(false)) return;
        dipatch(addStudent(formStudent));
        setFormStudent(form);
        target.current.focus();
    };
    const handleKeydown = (e) => {
        if (e.keyCode === 190) {
            const { name, value } = e.target;
            if (value[2] !== '0' && value[1] !== '0')
                setFormStudent({ ...formStudent, [name]: value + '.0' });
        }
    };
    const handleClear = () => {
        const id = setTimeout(() => dipatch(popL()), 3600);
        dipatch(clear({ form, id }));
        setFormStudent(form);
        target.current.focus();
    };
    useEffect(() => {
        dipatch(enter(formStudent));
    }, [formStudent, dipatch, enter]);

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
                {info.MSSV}
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
                {info.Name}
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
                {info.Birth}
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
                {info.Faculty}
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
                {info.QT}
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
                {info.GK}
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
                {info.CK}
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
                {info.Class}
            </Form.Group>
            <div className={styles.costumebutton}>
                <Button
                    variant="primary"
                    className={styles.customs_button}
                    type="submit"
                    disabled={button.submit}
                    onClick={handleSubmit}
                >
                    Thêm
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
