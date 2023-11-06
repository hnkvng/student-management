"use trict";

const status_list_element = [
    [
        {
            className: "list-item --page-in",
            name:"Quản lý sinh viên",
            icon:<i className="fa-solid fa-bars-progress"></i>
        },
        {
            className: "list-item --page-in",
            name:"Giảng viên / ...",
            icon:<i className="fa-solid fa-user"></i>
        },
    ],
    [
        {
            className: "list-item --page-out",
            name:"Đăng xuất",
            icon:<i className="fa-solid fa-arrow-right-from-bracket"></i>
        }
    ]
]
const tool_bar_element = [
    [
        {
            className: "t-list-item --item-hover-1",
            name:"Tổng quan",
            icon:<i className="fa-solid fa-layer-group"></i>
        },
        {
            className: "t-list-item --item-hover-1",
            name:"Học viên",
            icon:<i className="fa-solid fa-users"></i>
        },
        {
            className: "t-list-item --item-hover-1",
            name:"Lịch dạy",
            icon:<i className="fa-solid fa-calendar-days"></i>
        },
        {
            className: "t-list-item --item-hover-1",
            name:"Thống kê",
            icon:<i className="fa-solid fa-chart-simple"></i>
        }
    ],
    [
        {
            className: "t-list-item --item-hover-2",
            name:"Cài đặt",
            icon:<i className="fa-solid fa-gear"></i>
        }
    ]
]

function Navbar()
{
    return (
        <div className="status">  
            {
                (
                    status_list_element.map((element) => 
                        <ul className="status-list">
                            {element.map((e) =>
                            (
                                <li className={e.className}> 
                                    <div className = "icon">
                                        {e.icon} 
                                    </div>  
                                    <a className = "URL" href="#">{e.name}</a>                                
                                </li>         
                            ))}
                        </ul>
                ))
            }        
        </div>
    )
}
function Content()
{
    return (
        <div class="tool_bar">
            {
                (
                    tool_bar_element.map((element) => 
                        <ul className="tool_bar-list">
                            {element.map((e) =>
                            (
                                <li className={e.className}> 
                                    <div className = "icon">
                                        {e.icon} 
                                    </div>  
                                    <div className = "name">
                                        {e.name} 
                                    </div>                                      
                                </li>         
                            ))}
                        </ul>
                ))
            } 
        </div>
    )
}
//App
const App = () =>
{
    return (
        <div class="wrapper">
            <div class="grid">
               <header className="header">
                    <nav className="nav">
                        <Navbar />
                    </nav>     
                </header>
                <div className="content">
                    <Content />
                </div>
            </div>
        </div>
    )    
}

const main = ReactDOM.createRoot(document.querySelector(".main"))
main.render(<App />)