const status_list_name = ["Quản lý sinh viên","Giảng viên \ ...","Đăng xuất"];

export function Header()
{
    return (
        <div class="status">
            <ul class="status-list">
                <li class="list-item --page-in">
                    <i class="fa-solid fa-bars-progress"></i>
                    Quản lý sinh viên
                </li>
                <li class="list-item --page-in">
                    <i class="fa-solid fa-user"></i>
                    Giảng viên \ Huỳnh Nam Kha
                </li>
            </ul>
            <ul class="status-list">
                <li class="list-item --page-out">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    Đăng xuất
                </li>
            </ul>
        </div>
    )
}