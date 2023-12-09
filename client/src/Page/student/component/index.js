import React from 'react';
import styles from './main.module.css';
import Body from './body';
import Class from './classes';
import { useSelector } from 'react-redux';
import {
    getCurrentNameClasses,
    getIconCurrent,
} from '../../../redux/selectors';
import Option from './options';
import CheckBox from './checkbox';
import Button from 'react-bootstrap/Button';
function Table() {
    const ClassName = useSelector(getCurrentNameClasses);
    const icon = useSelector(getIconCurrent);
    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.title}>
                    <Class></Class>
                </div>
                <h3>
                    {ClassName} /
                    {icon.class !== undefined ? (
                        <i
                            className={icon.class}
                            id={styles.icon}
                            style={icon.style}
                        ></i>
                    ) : null}
                </h3>
            </div>
            <div className={styles.selection}>
                {ClassName !== null ? (
                    <Option ClassName={ClassName}></Option>
                ) : null}
                {/* <Button
                    variant="primary"
                    className={styles.customs_button}
                    type="button"
                    // disabled={button.submit}
                    // onClick={handleSubmit}
                >
                    Thực hiện
                </Button>   */}
            </div>
            <div className={styles.table_responsive}>
                <table className="table table-hover table-condensed table-condensed">
                    <thead>
                        <tr>
                            <th scope="col">
                                {icon.class === 'fa-solid fa-trash' ? (
                                    <CheckBox all={'all'}></CheckBox>
                                ) : null}
                                {icon.class !== undefined ? (
                                    <i id={styles.icon}></i>
                                ) : null}
                                STT
                            </th>
                            <th scope="col">MSSV</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Khoa</th>
                            <th scope="col">QT</th>
                            <th scope="col">GK</th>
                            <th scope="col">CK</th>
                            <th scope="col">TB</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Body />
                    </tbody>
                </table>
            </div>
            <ul>
                <span>
                    <strong>*Chú giải:</strong>
                </span>
                <li>STT: Số thứ tự</li>
                <li>MSSV: Mã số sinh viên</li>
                <li>QT: điểm quá trình</li>
                <li>GK: điểm giữa kì</li>
                <li>CK: điểm cuối kì</li>
                <li>TB: điểm trung bình</li>
            </ul>
        </div>
    );
}

export default Table;
