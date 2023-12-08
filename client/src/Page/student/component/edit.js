import React, { useEffect } from 'react';
import FormAdd from '../../add/FormAdd';
import { useDispatch } from 'react-redux';
import { getApiEdit } from './TableSlice';
import { useParams } from 'react-router-dom';
function Edit() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getApiEdit(id));
    });
    return <FormAdd></FormAdd>;
}

export default Edit;
