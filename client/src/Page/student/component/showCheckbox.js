import React from 'react';
import CheckBox from './checkbox';
function ShowCheckBox({ icon }) {
    return icon.name === 'delete' && <CheckBox></CheckBox>;
}
export default ShowCheckBox;
