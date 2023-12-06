import React from 'react';
import FormInput from './component/Form';
import styles from './component/Form/main.module.css';
function FormAdd() {
    return (
        <div className={styles.container}>
            <FormInput />
        </div>
    );
}
export default FormAdd;
