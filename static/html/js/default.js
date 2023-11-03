import { Doms } from "./export.js";
window.addEventListener("keydown",handleAdd);
function handleAdd(event)
{
    if(event.ctrlKey)
    {
        Doms.add_row.onclick()
    }
    if(event.keyCode == 16)
    {
        Doms.delete_row.onclick()
    }
   
}