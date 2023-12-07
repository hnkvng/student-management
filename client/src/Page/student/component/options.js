import React from 'react';

function Option() {
    return (
        <Form.Select
            className={styles.select_option}
            onClick={handleSelectClick}
        >
            <option value="Hành động">Hành động</option>
            <option value="Xóa">Xóa</option>
            <option value="Chỉnh sửa">Chỉnh sửa</option>
        </Form.Select>
    );
}
export default Option;
