import React from 'react';
import CheckBox from './checkbox';
function ShowCheckBox({ icon, listCheckBox }) {
    return (
        icon.name === 'delete' && (
            <CheckBox listCheckBox={listCheckBox}></CheckBox>
        )
    );
}
export default ShowCheckBox;
