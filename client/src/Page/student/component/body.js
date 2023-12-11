import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSlice, { getApiStudent, getApiClasses } from './TableSlice';
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
        const id = setTimeout(() => {
            dispatch(desploy());
        }, 4000);
        setIdTimeOut(id);
    };
    const dispatch = useDispatch();
    const [idTimeOut, setIdTimeOut] = useState(null);
    const setLog = LogSlice.actions.setLog;
    const desploy = LogSlice.actions.desploy;
    const clear = LogSlice.actions.clearAll;
    const setLogNull = TableSlice.actions.setLogNull;
    const logTable = useSelector(getLogTable);
    const dataStudent = useSelector(getInfoStudent);
    const id = useSelector(getCurrentIdClasses);
    const icon = useSelector(getIconCurrent);
    const actionDelete = useSelector(getDelete);
    useEffect(() => {
        dispatch(getApiStudent(id));
    }, [dispatch, id]);
    useEffect(() => {
        dispatch(clear());
    }, []);
    useEffect(() => {
        if (actionDelete) {
            dispatch(getApiClasses());
            dispatch(setLog({ target: logTable, timeId: idTimeOut }));
            dispatch(getApiStudent(id));
            dispatch(setLogNull());
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
