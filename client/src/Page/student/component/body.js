import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableSlice, { getApiStudent, getApiClasses } from './TableSlice';
import {
    getInfoStudent,
    getCurrentIdClasses,
    getIconCurrent,
    getDelete,
} from '../../../redux/selectors';
import ShowIcon from './showIcon';
import LogSlice from '../../../log/LogSlice';
import ShowCheckBox from './showCheckbox';

function Body() {
    const dispatch = useDispatch();
    const clear = LogSlice.actions.clearAll;
    const setLogNull = TableSlice.actions.setLogNull;
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
            dispatch(getApiStudent(id));
            dispatch(setLogNull());
        }
    }, [actionDelete]);
    return dataStudent.map((data, index) => (
        <tr key={index}>
            <td>
                <ShowCheckBox icon={icon}></ShowCheckBox>
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
