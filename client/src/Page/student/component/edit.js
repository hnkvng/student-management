import React, { useEffect } from 'react';
import Add from '../../add/Add';
import { useDispatch, useSelector } from 'react-redux';
import { editStudent } from '../../add/component/Form/FormSlice';
import { useParams } from 'react-router-dom';
import { getStudentEdit } from '../../../redux/selectors';
import { getApiStudentEdit } from './TableSlice';
import FormSlice from '../../add/component/Form/FormSlice';

function Edit() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const form = FormSlice.actions.enterStudent;
    const setSatus = FormSlice.actions.setSatus;
    const studentEdit = useSelector(getStudentEdit);
    const setNameButton = FormSlice.actions.setNameButton;
    useEffect(() => {
        dispatch(getApiStudentEdit(id));
        dispatch(setNameButton('Chỉnh'));
    }, []);
    useEffect(() => {
        dispatch(form(studentEdit));
        dispatch(setSatus());
    }, [studentEdit]);
    return <Add method={editStudent}></Add>;
}

export default Edit;
