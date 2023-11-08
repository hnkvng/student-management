
import {Doms,bases,outputs,tests} from "./export.js"

//Variable const
export const DATA = {};

//Variable global
export let element = update();
export const newElement = [];
export let list_input = [];
export const name_data = ["ID","Name","C#","Java","C++"];

//start Function

export function update()
{
    let row_All= bases.$$$(".row");
    let input_ID_All = bases.$$$("#input_ID");
    let input_Name_All = bases.$$$("#input_Name");
    let input_1_All = bases.$$$("#input_1");
    let input_2_All = bases.$$$("#input_2");
    let input_3_All = bases.$$$("#input_3");
    return [row_All,input_ID_All,input_Name_All,input_1_All,input_2_All,input_3_All];
}update();

export function train_Full()//duyệt qua hết dữ liệu trên bảng
{    
    element = update();
    list_input = get_Member_Current_Input();
    train_Row_Data();
    train_Column_Data();
    return(Object.keys(DATA).length > 0)
}

export function focus_Firt()
{
    if(list_input != 0)
    {
        list_input[0].focus(); 
    }
}

export function train_Row_Data()//duyệt qua hàng
{   
    element[0].forEach((e,index) => {
        DATA[index] = {};
    });
}

export function train_Column_Data()//duyệt qua cột
{
    for(let i = 1; i < element.length; i ++)
    {
        element[i].forEach((e,index) => {
            DATA[index + 1][e.name] = e.value;
        });
    }
}

export function test_Undefined()//kiểm tra undefined và null
{
    for(let i = 1; i < element.length; i ++)
    {
        element[i].forEach((e,index)=> {
            if(e.tagName == "TD" )
            {
                if(DATA[index+1][undefined] == undefined)
                {
                    delete DATA[index+1][undefined];
                }
                DATA[index + 1][e.dataset["name"]] = e.textContent;         
            }
        });
    }
    return true;
}

export function test_Data_Empty()//kiểm tra rỗng
{
    let empty = true;
    for(let i = 1; i < add_Element_Row().length; i++)
    {
        element[i].forEach((e,index) => {
            empty = element.some((e) => e[index].value == "")
        }) 
    }
    if(empty)
    {
        alert("nhập thiếu")
    }
    return empty
}

export function find_number(data)//tìm số trong chuỗi
{
    let number = "";
    Object.values(data).forEach((e)=>
    {
        if(!isNaN(e))
        {
            number = number + e;
        }
    })
    return number;
}
    
export function find_string(data)//tìm chữ trong chuỗi
{
    let string = "";
    Object.values(data).forEach((e)=>
    {
        if(isNaN(e))
        {
            string = string + e;
        }
    })
    return string;
}

export function draw_Error(data,target,find)
{
    if(find(data) != "")
    {
        target.setAttribute("style","color:var(--error--color)");
        return false;
    }
    return true; 
}


export function draw_Error_Point(data,target,find)
{
    let number = parseInt(data);
    if(isNaN(number) || number > 10 || number < 0 || find(data) != "")
    {
        target.setAttribute("style","color:var(--error--color)");
        return false;
    }
    return true;
}

export function test_Data_Error()//kiểm tra lỗi trong dữ liệu
{
    if(!test_Data_Empty())
    {
        let a,b,c;
        a = true;
        b = true;
        c = true;
        for(let i of list_input)
        {
            switch (i.name)
            {                  
                case "ID":
                    a = draw_Error(i.value,i,find_string);
                    break;
                case "Name":
                    b = draw_Error(i.value,i,find_number);     
                    break;  
                default:
                    c = draw_Error_Point(i.value,i,find_string);   
                    break;             
            }
        }
        return (a && b && c);
    }
    return false;
}

export function add_Element_Row()//lấy toàn bộ thẻ <tr>
{
    let member_row = [];
    element[0].forEach((e,index) => {
        member_row[index] = e;
    });
    return member_row;
}

export function get_Member_Current_Input()//lấy toàn bộ thẻ <input>
{
    element = update();
    let list_new = [];
    for(let i = 1; i < element.length; i ++)
    {
        element[i].forEach((element)=> {
            if(element.tagName == "INPUT")
            {
                list_new.push(element)            
            }
        });
    }
    if(list_new == 0)
    {
        return null;
    }
    return list_new;
}

export function remove_Button()
{
    let len = Object.keys(DATA).length;
    if(len == 0)
    {
        Doms.row_icon.removeChild(delete_row);
    }

}remove_Button();

export function add_Click()
{
    outputs.run_Add(add);
}

export function add()
{
    Doms.row_icon.appendChild(delete_row);
    let k = newElement.length;
    newElement[k] = bases.createElement("tr");
    newElement[k].className = "row";
    newElement[k].innerHTML = `
    <td>
        <input id="input_ID" type="text" name="ID" title = "nhập 0 - 9999" maxlength="4">             
    </td>
    <td>
        <input id="input_Name" type="text" name="Name" title = "nhập tên" maxlength="50" >                
    </td>
    <td>
        <input id="input_1" type="text" name="C#" title = "nhập điểm C#" maxlength="3">               
    </td>
    <td>
        <input id="input_2" type="text" name="Java" title = "nhập điểm Java" maxlength="3">                   
    </td>
    <td>
        <input id="input_3" type="text" name="C++" title = "nhập điểm C++"maxlength="3">
    </td>
    `;
    Doms.table.childNodes[1].insertBefore(newElement[k],Doms.row_icon);
    return true;
}
export async function delete_Click()
{
    await outputs.run_Delete(delete_1);
}

export function delete_1()
{
    let k = newElement.length - 1;
    try 
    {
        if(k > 0)
        {
            Doms.table.childNodes[1].removeChild(newElement[k]);   
            newElement.pop(newElement[k]);
            delete DATA[k + 1];
        }
        else 
        {      
            Doms.row_icon.removeChild(delete_row);
            Doms.table.childNodes[1].removeChild(newElement[k]);   
            newElement.pop(newElement[k]);
            delete DATA[k + 1];      
        }
    }
    catch
    {
        return false;
    }  
    return true;
}
export function same_ID()
{
    let bool = true;
    let row = add_Element_Row().length
    for(let i = 1; i < row ; i++)
    {
        let k = DATA[i]["ID"];
        for(let j = i + 1; j < row; j++)
        {         
            if( k == DATA[j]["ID"] )
            {
                alert(`ID đã bị trùng tại hàng ${j} và hàng ${i}`);
                bool = false;
            }
        }
    }
    return bool;
}
export function Print_click()
{   
    outputs.run_P(tests.test_true);
}
export function Print_()//in ra màn hình toàn bộ data
{
    Doms.table.childNodes[1].innerHTML = "";
    Doms.table.childNodes[1].innerHTML = 
    `
        <tr class="row">
            <td class="ID" >ID</td>
            <td class="Name">Name</td>
            <td class="Point_1">C#</td>
            <td class="Point_2">Java</td>
            <td class="Point_3">C++</td>
        </tr>
    `;
    for(let i in DATA)
    {           
        if(i > 0)  
        {
            const newnode = document.createElement("tr");
            newnode.classList = "row";
            newnode.innerHTML = `
            <td class="ID" id ="input_ID" data-name="ID">${DATA[i]["ID"]}</td>
            <td class="Name" id ="input_Name" data-name="Name">${DATA[i]["Name"]}</td>
            <td class="Point_1" id ="input_1" data-name="C#">${DATA[i]["C#"]}</td>             
            <td class="Point_2" id ="input_2" data-name="Java">${DATA[i]["Java"]}</td>
            <td class="Point_3" id ="input_3" data-name="C++">${DATA[i]["C++"]}</td>`;
            Doms.table.childNodes[1].appendChild(newnode);
            Doms.table.childNodes[1].appendChild(Doms.row_icon);
            newElement[i - 1] = newnode;
        }     
    }
}

export function set_Event()//set những sự kiện xảy ra
{
    table.addEventListener("click",handleClick)
    table.addEventListener("keydown",handleKeydown)
}set_Event();

export function clear_Style(e_input)
{
    if( e_input.style.color == "var(--error--color)" )
    {
        e_input.style.color = "";
    }
    else if( e_input.style["backgroud-color"] == "var(--error--color)" )
    {
        e_input.style["backgroud-color"] == "";
    }
}

export function handleKeydown(event)
{
    const target = event.target.closest('input');
    if(target)
    {
        if (event.keyCode === 13)//13: Enter
        {
            Doms.Print.click();
        }
        if(event.keyCode === 8)//8: backspace
        {
            clear_Style(target);
        }
    } 
}

export function handledefault(event)
{
    if(event.ctrlKey)//:Ctrl
    {
        Doms.add_row.click();
    }
    if(event.keyCode === 16)//:Shift
    {
        Doms.delete_row.click();
    }
}
export function handleClick(event)
{
    const e_td = event.target.closest('td');
    if(e_td && e_td.childNodes[1] == undefined)
    { 
        let html_input = {
        "ID":`<input id="input_ID" type="text" name="ID" title = "nhập 0 - 9999" maxlength="4">`,
        "Name":`<input id="input_Name" type="text" name="Name" title = "nhập tên" maxlength="50" >`,
        "C#":`<input id="input_1" type="text" name="C#" title = "nhập điểm C#" maxlength="3">`,
        "Java":`<input id="input_2" type="text" name="Java" title = "nhập điểm Java" maxlength="3">`,
        "C++":`<input id="input_3" type="text" name="C++" title = "nhập điểm C++"maxlength="3">`
        };
        for(let i in html_input)
        {
            if(e_td.dataset["name"] == i) 
            {               
                e_td.className = "";
                e_td.id = "";
                e_td.dataset["name"] = "";                        
                e_td.innerHTML = html_input[i];
                e_td.childNodes[0].focus();             
            }
        }     
    }
}
//end Function
