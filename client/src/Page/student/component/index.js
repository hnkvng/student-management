import React from 'react';
import styles from './main.module.css';
import Body from './body';
import Class from './classes';
import { useSelector } from 'react-redux';
import {
    getCurrentNameClasses,
    getIconCurrent,
} from '../../../redux/selectors';
import CheckBox from './checkbox';
import ShowOption from './showOption';
import ShowIcon from './showIcon';
import { getLog, getTargetDelete } from '../../../redux/selectors';
import ShowLog from '../../../log/showLog';
import Card from './showCard';
function Table() {
    const ClassName = useSelector(getCurrentNameClasses);
    const icon = useSelector(getIconCurrent);
    const log = useSelector(getLog);
    const targetDelete = useSelector(getTargetDelete);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container_log}>
                {log.length > 0 && <ShowLog log={log}></ShowLog>}
                <Card {...targetDelete}></Card>
            </div>
            <div className={styles.grid}>
                <div className={styles.title}>
                    <Class></Class>
                </div>
                <h3>
                    {ClassName}/
                    <ShowIcon
                        icon={icon}
                        target="Lớp học"
                        ClassName={ClassName}
                    ></ShowIcon>
                </h3>
            </div>
            <div className={styles.selection}>
                <ShowOption ClassName={ClassName}></ShowOption>
            </div>
            <div className={styles.table_responsive}>
                <table className="table table-hover table-condensed table-condensed">
                    <thead>
                        <tr>
                            <th scope="col">
                                {icon.class === 'fa-solid fa-trash' ? (
                                    <>
                                        <CheckBox all="All"></CheckBox>
                                        <span
                                            className={styles.checkbox_all}
                                        ></span>
                                    </>
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
