import React from 'react';
import Option from './options';
import Button from 'react-bootstrap/Button';
function ShowOption({ ClassName }) {
    {
        /* <Button
        variant="primary"
        className={styles.customs_button}
        type="button"
        // disabled={button.submit}
            // onClick={handleSubmit}
        >
            Thực hiện
        </Button>   */
    }
    return ClassName !== null && <Option></Option>;
}
export default ShowOption;
