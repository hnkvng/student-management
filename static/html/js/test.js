import { mains} from "./export.js";


export async function test_true()
{
    let x = await mains.train_Full()
    let y = await mains.test_Undefined()
    let z = await mains.test_Data_Error()
    let v = await mains.same_ID();
    return (x && y && z && v)
}

