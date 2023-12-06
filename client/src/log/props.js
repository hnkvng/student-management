import styles from './main.module.css';

const props = {
    success: {
        info: 'Success',
        des: 'Thêm sinh viên thành công',
        icon: 'fa-solid fa-circle-check',
        theme: styles.toast_success,
    },
    edit: {
        info: 'Edit',
        des: 'Chỉnh sửa sinh viên thành công',
        icon: 'fa-regular fa-pen-to-square',
        theme: styles.toast_edit,
    },
    error: {
        info: 'Error',
        des: 'Thêm sinh viên không thành công',
        icon: 'fa-solid fa-circle-xmark',
        theme: styles.toast_error,
    },
    clear: {
        info: 'Clear',
        des: 'Dọn dẹp thành công',
        icon: 'fa-solid fa-circle-info',
        theme: styles.toast_info,
    },
    delete: {
        info: 'Delete',
        des: 'Xóa thành công',
        icon: 'fa-solid fa-user-minus',
        theme: styles.toast_delete,
    },
};
export default props;
