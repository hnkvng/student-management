import React from 'react';
import Option from './options';
import Button from 'react-bootstrap/Button';
import styles from './main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getListCheckBox, getCurrentIdClasses } from '../../../redux/selectors';
import TableSlice from './TableSlice';
function ShowOption({ ClassName }) {
    const dispatch = useDispatch();
    const setTarget = TableSlice.actions.setTargetDelete;
    const listCheck = useSelector(getListCheckBox);
    const ClassId = useSelector(getCurrentIdClasses);
    const hanleSetListDelete = () => {
        const listDelete = listCheck.filter((e) => e.check);
        dispatch(
            setTarget({
                title: `Xóa Sinh viên`,
                show: true,
                des: `Bạn có muốn xóa sinh viên này không!`,
                idStudent: listDelete.map((e) => e.target),
                idClass: ClassId,
                nameButton: 'Xóa',
                theme: 'danger',
                method: 'handleDeleteStudent',
            }),
        );
    };
    if (listCheck.find((e) => e.check)) {
        return (
            <>
                <Option></Option>
                <Button
                    variant="danger"
                    className={styles.customs_button}
                    type="button"
                    onClick={hanleSetListDelete}
                >
                    Thực hiện
                </Button>
            </>
        );
    }
    return ClassName !== null && <Option></Option>;
}
export default ShowOption;
