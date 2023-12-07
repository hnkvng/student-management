import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import styles from './main.module.css';
import Body from './body';
import Class from './classes';
function Table() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.title}>
                    <Class></Class>
                </div>
            </div>

            <div className={styles.table_responsive}>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">MSSV</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Khoa</th>
                            <th scope="col">QT</th>
                            <th scope="col">GK</th>
                            <th scope="col">CK</th>
                            <th scope="col">TB</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <Body />
                    </MDBTableBody>
                </MDBTable>
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
