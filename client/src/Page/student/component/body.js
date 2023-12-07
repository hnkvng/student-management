import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiStudent } from './TableSlice';
import { getInfoStudent, getCurrentIdClasses } from '../../../redux/selectors';

function Body() {
    const dipatch = useDispatch();
    const dataStudent = useSelector(getInfoStudent);
    const id = useSelector(getCurrentIdClasses);
    useEffect(() => {
        dipatch(getApiStudent(id));
    }, [dipatch, id]);
    return dataStudent.map((data, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
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
