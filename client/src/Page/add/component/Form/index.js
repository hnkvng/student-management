import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import FormSlice from './FormSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { dataStudent } from '../../../../redux/selectors';
import clsx from 'clsx';

function FormInput() {
    const [formStudent, setFormStudent] = useState({
        MSSV: '',
        Name: '',
        Birth: '',
        Faculty: '',
        QT: '',
        GK: '',
        CK: '',
        Class: '',
    });
    const classFormGroup = clsx('mb-3', [styles.form_group]);
    const dipatch = useDispatch();
    const check = FormSlice.actions.checkData;
    const enter = FormSlice.actions.enterStudent;
    const data = useSelector(dataStudent);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormStudent({ ...formStudent, [name]: value });
        dipatch(check({ name: name, value: value }));
    };
    useEffect(() => {
        dipatch(enter(formStudent));
    }, [formStudent, dipatch, enter]);
    useEffect(() => {
        console.log(data);
    });
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
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Họ và tên sinh viên</Form.Label>
                <Form.Control
                    type="text"
                    name="Name"
                    value={formStudent.Name}
                    onChange={handleInputChange}
                    maxLength={255}
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                    type="date"
                    name="Birth"
                    value={formStudent.Birth}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Khoa</Form.Label>
                <Form.Control
                    type="text"
                    name="Faculty"
                    value={formStudent.Faculty}
                    onChange={handleInputChange}
                    maxLength={255}
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Điểm quá trình</Form.Label>
                <Form.Control
                    type="text"
                    name="QT"
                    value={formStudent.QT}
                    onChange={handleInputChange}
                    maxLength={3}
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Điểm giữa kì</Form.Label>
                <Form.Control
                    type="text"
                    name="GK"
                    value={formStudent.GK}
                    onChange={handleInputChange}
                    maxLength={3}
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Điểm cuối kì</Form.Label>
                <Form.Control
                    type="text"
                    name="CK"
                    value={formStudent.CK}
                    onChange={handleInputChange}
                    maxLength={3}
                />
            </Form.Group>
            <Form.Group className={classFormGroup}>
                <Form.Label>Mã lớp</Form.Label>
                <Form.Control
                    type="text"
                    name="Class"
                    value={formStudent.Class}
                    onChange={handleInputChange}
                    maxLength={255}
                />
            </Form.Group>
            <div className={styles.costumebutton}>
                <Button
                    variant="primary"
                    className={styles.customs_button}
                    type="submit"
                >
                    Thêm
                </Button>
                <Button variant="primary" className={styles.customs_button}>
                    Dọn
                </Button>
            </div>
        </Form>
    );
}
export default FormInput;
