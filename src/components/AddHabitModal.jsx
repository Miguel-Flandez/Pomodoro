import { useEffect, useRef, useState } from "react"

export default function AddHabitModal({addModalState, habitHandler, editValues, resetHandler}){

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const inputRef = useRef(null)
    const [selectedDay, setSelectedDay] = useState([])
    const [habitName, setHabitName] = useState('')

    
    function toggleDay(day){
        setSelectedDay(prev=>{
            if(prev.includes(day)){
                return prev.filter(e=>e!==day)
            }
            return [...prev, day]
        })
    }
    function close(){
        addModalState(false);
        inputRef.current.value = ''
        setSelectedDay([]);
        setHabitName('')
        resetHandler(true)
    }

    useEffect(()=>{
        if(editValues){        
        inputRef.current.value = editValues.name
        setSelectedDay(editValues.schedule)
        }else{
            return
        }
        
    },[editValues])


    return(
        <div id="modal-container" className="h-screen relative bg-blue-600 flex flex-col items-center py-[2rem] px-[1rem] gap-[5vw] rounded-r-4xl">

            <div className="flex items-center gap-[2vw]">
                <span className="text-[2rem] font-bold whitespace-nowrap">Add a Habit</span>
                <button onClick={close}>
                    <i class="fa-solid fa-xmark transition-transform hover:scale-120 text-[3rem]"></i>
                </button>
            </div>
            

            

            <div id="add" className="flex flex-col w-[90%]">
                <label htmlFor="habit" className="text-[2rem]">Name this Habit</label>
                <input ref={inputRef} type="text" id="habit" className="border-2 text-[2rem] border-white rounded-sm h-[3rem]" onChange={(e)=>{setHabitName(e.target.value)}}/>
            </div>

            <div id="frequency" className="w-full flex justify-evenly">
                {days.map(day=>(
                    <button key={day} className={`${selectedDay.find(e=>e===day)?'bg-red-800':''} text-[1rem] border-1 border-white rounded-md px-[1rem] py-[0.25rem] hover:border-blue-800`}
                    onClick={()=>toggleDay(day)}>{day}</button>
                ))}
            </div>

            <button id="confirm" onClick={()=>{close();habitHandler(habitName, selectedDay)}} className="hover:bg-red-800">
                Confirm
            </button>

        </div>
    )
}