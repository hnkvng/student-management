import Nav from 'react-bootstrap/Nav';
import styles from './main.module.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header>
            <Nav>
                <Nav.Item>
                    <Link to="/" className={styles.nav_link}>
                        Trang chủ
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/student" className={styles.nav_link}>
                        Sinh viên
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/student/add" className={styles.nav_link}>
                        Thêm sinh viên
                    </Link>
                </Nav.Item>
            </Nav>
        </header>
    );
}

export default Header;
