import React, { useEffect, useState } from 'react';
import FormInput from './component/Form';
import styles from './component/Form/main.module.css';
import { useSelector } from 'react-redux';
import {
    formStudent,
    infoInputStudent,
    styleInputStudent,
    statusInputStudent,
    infoLog,
    statusButton,
    getNameButton,
    getStatusAdd,
    getStatusEdit,
} from '../../redux/selectors';
import Log from '../../log/log';

function FormAdd({ method }) {
    const [idTimeOut, setIdTimeOut] = useState(null);
    const student = useSelector(formStudent);
    const info = useSelector(infoInputStudent);
    const style = useSelector(styleInputStudent);
    const status = useSelector(statusInputStudent);
    const statusBut = useSelector(statusButton);
    const log = useSelector(infoLog);
    const nameButton = useSelector(getNameButton);
    const edit = useSelector(getStatusEdit);
    const add = useSelector(getStatusAdd);
    return (
        <>
            {log !== '' ? (
                <div id={styles.toast}>
                    <Log {...log}></Log>
                </div>
            ) : null}
            <div className={styles.container}>
                <FormInput
                    nameButton={nameButton}
                    student={student}
                    info={info}
                    log={log}
                    style={style}
                    status={status}
                    button={statusBut}
                    id={idTimeOut}
                    method={method}
                    edit={edit}
                    add={add}
                    setIdTimeOut={setIdTimeOut}
                />
            </div>
        </>
    );
}
export default FormAdd;
