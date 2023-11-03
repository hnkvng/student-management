import { mains } from "./export.js";


export async function run_P(fun)
{
    if(await fun())
    {
        mains.Print_();
    }
}
export async function run_Add(fun)
{
    await fun();   
    await mains.train_Full();  
}
export async function run_Delete(fun)
{
    await fun(); 
    await mains.train_Full();
     
}