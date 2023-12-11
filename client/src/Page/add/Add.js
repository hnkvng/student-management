import React, { useEffect, useState } from 'react';
import FormInput from './component/Form';
import styles from './component/Form/main.module.css';
import { useSelector } from 'react-redux';
import {
    formStudent,
    errorInputStudent,
    styleInputStudent,
    statusInputStudent,
    statusButton,
    getNameButton,
    getStatusAdd,
    getStatusEdit,
    getLog,
    getLogForm,
} from '../../redux/selectors';
import ShowLog from '../../log/showLog';

function FormAdd({ method }) {
    const [idTimeOut, setIdTimeOut] = useState(null);
    const props = {
        student: useSelector(formStudent),
        error: useSelector(errorInputStudent),
        style: useSelector(styleInputStudent),
        status: useSelector(statusInputStudent),
        button: useSelector(statusButton),
        log: useSelector(getLog),
        logForm: useSelector(getLogForm),
        nameButton: useSelector(getNameButton),
        edit: useSelector(getStatusEdit),
        add: useSelector(getStatusAdd),
        idTimeOut: idTimeOut,
        method: method,
        setIdTimeOut: setIdTimeOut,
    };
    return (
        <>
            {props.log.length > 0 && <ShowLog log={props.log}></ShowLog>}
            <div className={styles.container}>
                <FormInput {...props} />
            </div>
        </>
    );
}
export default FormAdd;
