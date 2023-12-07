import React, { useState } from 'react';
import FormInput from './component/Form';
import styles from './component/Form/main.module.css';
import { useSelector } from 'react-redux';
import {
    infoInputStudent,
    styleInputStudent,
    statusInputStudent,
    infoLog,
    statusButton,
} from '../../redux/selectors';
import Log from '../../log/log';

function FormAdd() {
    const [idTimeOut, setIdTimeOut] = useState(null);
    const info = useSelector(infoInputStudent);
    const style = useSelector(styleInputStudent);
    const status = useSelector(statusInputStudent);
    const statusBut = useSelector(statusButton);
    const log = useSelector(infoLog);
    return (
        <>
            {log !== '' ? (
                <div id={styles.toast}>
                    <Log {...log}></Log>
                </div>
            ) : null}
            <div className={styles.container}>
                <FormInput
                    info={info}
                    log={log}
                    style={style}
                    status={status}
                    button={statusBut}
                    id={idTimeOut}
                    setIdTimeOut={setIdTimeOut}
                />
            </div>
        </>
    );
}
export default FormAdd;
