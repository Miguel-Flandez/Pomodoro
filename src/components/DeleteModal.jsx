import { useContext } from "react"
import {MyContext} from '@/context'

export default function DeleteModal({deleteHandler}){

    const {setDeleteChoice} = useContext(MyContext)

    
    return(
        <div className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] transition-all cursor-default`}>
            <div className={` bg-blue-800 border-[#1211112f] flex flex-col justify-around absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[1rem] px-[1.25rem]`}>
                <span className="font-bold">Are you sure you want to delete this habit?</span>
                <div id="choice" className="flex justify-between">
                    <span className="bg-green-800 hover:bg-green-700" onClick={()=>{setDeleteChoice(true);deleteHandler(true)}}>Yes</span>
                    <span className="bg-red-800 hover:bg-red-700" onClick={()=>{setDeleteChoice(false);deleteHandler(false)}}>No</span>
                </div>
            </div>
        </div>
    )
}