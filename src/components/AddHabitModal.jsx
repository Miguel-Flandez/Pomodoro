import { useEffect, useRef, useState } from "react"

export default function AddHabitModal({addModalState, habitHandler, editValues, resetHandler}){

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const inputRef = useRef(null)
    const [warning, setWarning] = useState('')
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

    function confirm(){
        if(inputRef.current.value && inputRef.current.value.trim() && selectedDay.length>0){
            close();
            habitHandler(habitName, selectedDay)
            setWarning('')
        }else if(inputRef.current.value && inputRef.current.value.trim()){
            setWarning('Select at least one day')
        }else if(selectedDay.length>0){
            setWarning('Please name the habit')
        }else{
            setWarning('Please name the habit and select at least one day')
        }
         
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
        <div id="modal-container"
        className="h-screen relative bg-[#144272] flex flex-col items-center py-[2rem] px-[1rem] gap-[5vw] rounded-r-4xl">

            <div className="flex items-center justify-between gap-[2vw] w-[90%]">
                <span className="text-[2.5rem] font-bold whitespace-nowrap">Add a Habit</span>
                <button onClick={close}>
                    <i className="fa-solid fa-xmark transition-transform hover:rotate-90 text-[2rem]"></i>
                </button>
            </div>
            

            

            <div id="add" className="flex flex-col w-[90%]">
                <label htmlFor="habit" className="text-[2rem]">Name this Habit</label>
                <input ref={inputRef} type="text" id="habit" className="text-[2rem] border-b-2 focus:outline-none h-[3rem]" autoComplete="off" onChange={(e)=>{setHabitName(e.target.value)}}/>
                
            </div>

            <div id="frequency" className="w-[90%] grid grid-cols-[repeat(4,1fr)] gap-[2vw] justify-evenly flex-wrap ">
                {days.map(day=>(
                    <button key={day} className={`${selectedDay.find(e=>e===day)?'bg-[#2C74B3]! border-[#2C74B3]!':''} transition-all text-[1rem]  bg-[#1211112f] hover:bg-[#205295] rounded-md px-[1rem] py-[0.25rem]`}
                    onClick={()=>toggleDay(day)}>{day}</button>
                ))}
            </div>

            <div id="button-container" className="h-[4rem]">
                <button className={`hover:bg-[#368bd6] bg-[#2C74B3] rounded-md transition-colors duration-200 font-bold font-mono px-[3rem] py-[1rem]`}
                onClick={confirm}>Confirm</button>
            </div>

            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">{warning}</span>

        </div>
    )
}