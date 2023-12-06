import React from 'react';
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
    const info = useSelector(infoInputStudent);
    const style = useSelector(styleInputStudent);
    const status = useSelector(statusInputStudent);
    const statusBut = useSelector(statusButton);
    const log = useSelector(infoLog);
    return (
        <>
            <div id={styles.toast}>
                {log.map((element, index) => (
                    <Log key={index} {...element.info}></Log>
                ))}
            </div>
            <div className={styles.container}>
                <FormInput
                    info={info}
                    style={style}
                    status={status}
                    log={log}
                    button={statusBut}
                />
            </div>
        </>
    );
}
export default FormAdd;
