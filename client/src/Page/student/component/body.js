import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSlice, { getApiStudent } from './TableSlice';
import {
    getInfoStudent,
    getCurrentIdClasses,
    getIconCurrent,
    getDelete,
    getLog,
    getLogTable,
} from '../../../redux/selectors';
import CheckBox from './checkbox';
import ShowIcon from './showIcon';
import LogSlice from '../../../log/LogSlice';

function Body() {
    const setTime = () => {
        if (log === '') {
            const id = setTimeout(() => {
                dispatch(set());
                dispatch(setLogNull());
                dispatch(setTableLogNull());
            }, 4000);
            setIdTimeOut(id);
        }
    };
    const dispatch = useDispatch();
    const [idTimeOut, setIdTimeOut] = useState(null);
    const set = LogSlice.actions.setInfo;
    const setLog = LogSlice.actions.setLog;
    const setLogNull = LogSlice.actions.setLogNull;
    const setIdTime = LogSlice.actions.setIdTime;
    const setTableLogNull = TableSlice.actions.setLogNull;
    const log = useSelector(getLog);
    const logTable = useSelector(getLogTable);
    const dataStudent = useSelector(getInfoStudent);
    const id = useSelector(getCurrentIdClasses);
    const icon = useSelector(getIconCurrent);
    const actionDelete = useSelector(getDelete);
    useEffect(() => {
        dispatch(getApiStudent(id));
    }, [dispatch, id]);
    useEffect(() => {
        if (actionDelete) {
            setTime();
            dispatch(getApiStudent(id));
            dispatch(setLog(logTable));
            dispatch(setIdTime(idTimeOut));
        }
    }, [actionDelete]);
    return dataStudent.map((data, index) => (
        <tr key={index}>
            <td>
                {icon.class === 'fa-solid fa-trash' ? (
                    <CheckBox></CheckBox>
                ) : null}
                <ShowIcon
                    icon={icon}
                    target="Sinh viên"
                    id={data._id}
                ></ShowIcon>
                {index + 1}
            </td>
            <td>{data.MSSV}</td>
            <td>{data.Name}</td>
            <td>{data.Birth}</td>
            <td>{data.Faculty}</td>
            <td>{data.QT}</td>
            <td>{data.GK}</td>
            <td>{data.CK}</td>
            <td>{data.TB}</td>
        </tr>
    ));
}

export default Body;
