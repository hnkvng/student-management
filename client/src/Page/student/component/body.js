import React, { createContext, useEffect } from 'react';
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

export const context = createContext();

function Body() {
    const dispatch = useDispatch();
    const clear = LogSlice.actions.clearAll;
    const setLogNull = TableSlice.actions.setLogNull;
    const listCheck = TableSlice.actions.setListCheckBox;
    const checkAll = TableSlice.actions.setCheckAll;
    const dataStudent = useSelector(getInfoStudent);
    const id = useSelector(getCurrentIdClasses);
    const icon = useSelector(getIconCurrent);
    const actionDelete = useSelector(getDelete);
    useEffect(() => {
        dispatch(getApiStudent(id));
        dispatch(checkAll(false));
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
    useEffect(() => {
        dispatch(
            listCheck(
                dataStudent.map((e) => {
                    return {
                        target: e._id,
                        check: false,
                    };
                }),
            ),
        );
    }, [dataStudent]);
    return dataStudent.map((data, index) => (
        <tr key={index}>
            <td>
                <context.Provider value={data._id}>
                    <ShowCheckBox icon={icon}></ShowCheckBox>
                </context.Provider>
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
