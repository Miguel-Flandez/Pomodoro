
import React from "react";
import { useMemo, useState} from "react";
import { pop } from "@/assets";

export default function HabitTracker({ showAddModal,  setShowAddModal, habits, setHabits,
     setEditIndex, setShowDeleteModal, setDeleteIndex}){

    const [dailyOrWeekly, setDailyOrWeekly] = useState(0)
    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date().getDay();
    const todate = new Date()

    // days sorted with current day at the rightmost
    const sortedDays = useMemo(()=>{
        return [...days.slice(today+1), ...days.slice(0, today+1)]
    },[])

    // the last seven days that match the days
    const lastSevenDates = useMemo(()=>{
    let arr = []

    for(let i = 6; i>=0; i--){
        const date = new Date()
        date.setDate(todate.getDate()-i)
        arr.push(String(date.getDate()).padStart(2, '0'))
    }
    return arr

    }, [])
    
    const popSound = new Audio(pop)


    // handles checkbox saving
    function checkHabit(habitIndex, date){

    const updatedEntry = (function(){
        return habits.map((habit, index)=>habitIndex===index ?{
            ...habit, 
            daysCompleted: habit.daysCompleted.find(i=>i===date) ? habit.daysCompleted.filter(i=>i!==date) : [...habit.daysCompleted, date]
            } : habit

            
        )
    })()
    setHabits(updatedEntry)
    localStorage.setItem('habits', JSON.stringify(updatedEntry))
    }
    

    return(

        <div className="flex max-lg:flex-col gap-[1vw] w-[90%] h-[80%] justify-center m-auto">

            <div id="daily" className={`${dailyOrWeekly===1 ? 'max-md:h-full' : dailyOrWeekly===2 ? 'max-md:hidden' : ''} transition-all flex flex-col gap-[1vw] w-[25%] max-lg:w-full h-full max-lg:h-[50%]  bg bg-[#1211112f] rounded-xl p-[1rem]`}>
                <div id="daily-header" className=" text-[1rem] font-bold flex flex-col items-center">
                
                    <h1>{todate.toLocaleString('default',{month:'short'})} {todate.toLocaleString('default',{day:'numeric'})}</h1>
                    <h1>{todate.toLocaleString('default', {weekday:'long'})}</h1>
                    
                </div>

                {/* todays habits only */}
                <div className="flex flex-col h-full gap-[1vw] overflow-auto">
                    {habits.map((habit,index)=>{
                        const date = new Date()
                        date.setDate(todate.getDate())

                           return habit.schedule.find(e=>e===todate.toLocaleString('default',{weekday:'short'})) && (
                            
                            <button key={index} className="flex justify-between items-center min-h-[5rem] text-[1.5rem] relative rounded-xl overflow-hidden px-[1rem]"
                                onClick={()=>{checkHabit(index, date.getDate());popSound.play()}}>
                                <span className="z-10">{habit.name}</span>
                                {habit.daysCompleted.find(e=>e===todate.getDate()) && <i className="fa-solid fa-check z-10"></i>}
                                {!habit.daysCompleted.find(e=>e===todate.getDate()) && <i className="fa-solid fa-x z-10"></i>}
                                <div className={`${habit.daysCompleted.find(e=>e===date.getDate()) && 'w-full!'} z-0 absolute left-0 w-[2%] h-full bg-[#2C74B3] transition-all`}></div>
                            </button>
                            )
                        }
                    )}

                </div>
                
            </div>
        
            {/* weekly habits */}
            <div id='weekly' className={`${dailyOrWeekly===2 ? 'max-md:h-full' : dailyOrWeekly===1 ? 'max-md:hidden' : ''} transition-all w-[70%] max-lg:w-full h-full max-lg:h-[50%] bg-[#1211112f] p-[1rem] rounded-xl overflow-auto max-lg:overflow-x-hidden`}>
                <div id="grid" className='grid grid-cols-[3fr_repeat(7,1fr)_3fr] gap-[2vw]  max-lg:gap-1 max-md:grid-cols-[repeat(9,10%)] items-center max-md:text-[0.75rem]'>
                    <div id="weekly-header" className='text-[1rem] font-bold flex flex-col items-center max-md:text-transparent'>
                        <h1>{todate.toLocaleString("default", {month:"long"})}</h1>
                        <h1>{todate.toLocaleString("default", {year:"numeric"})}</h1>
                    </div>
                            
                        {sortedDays.map((day,i)=>(
                            <div id="date-header" className='flex flex-col' key={day}>
                                <span>{day}</span>
                                <span>{lastSevenDates[i]}</span>
                            </div>
                            
                        ))}
                            
                        <div className='flex flex-col'>
                            <button className={`${showAddModal && 'hidden'} flex gap-[1rem] items-center justify-center cursor-default hover:bg-[#1211112f] hover:rounded-md py-[0.5rem] px-[1rem]`}
                                onClick={()=>setShowAddModal(true)}>
                                <i className="fa-solid fa-plus"></i>
                                <span className='whitespace-nowrap max-md:hidden'>Add Habit</span>
                            </button>
                            {/* for testing */}
                            <button id="reset" className='hover:bg-red-800' onClick={()=>{localStorage.setItem('habits', []);setHabits([])}}>reset</button>
                            <div className={`${!showAddModal && 'hidden' }`}></div>
                        </div>
                        
                    <div id="weekly-bottom" className='contents'>
                    {habits.map((habit, index)=>(
                        <React.Fragment key={index}>
                            <span id="habit">{habit.name}</span>
                            {sortedDays.map((day, id)=>{
                                const date = new Date()
                                date.setDate(todate.getDate() - (6-id))    
                            
                            return(
                                <React.Fragment key={id}>
                                    {habit.schedule?.find(n=>n===day) && <button className={` border-2 overflow-hidden rounded-[50%] w-[2rem] max-md:w-[1rem] h-[2rem] max-md:h-[1rem]`}
                                    onClick={()=>{checkHabit(index, date.getDate());popSound.play()}}>
                                        <div className={`${habit.daysCompleted.find(e=>e===date.getDate()) && 'scale-200'} transition-all duration-500 rounded-[50%] bg-white w-full h-full scale-0`}></div>
                                    </button>}
                                    {!habit.schedule?.find(n=>n===day) && <div></div>}
                                </React.Fragment>
                            )})} 
                            
                            <div id="icons" className='flex justify-evenly'>
                                <i className="fa-solid fa-pen-to-square hover:text-[#2C74B3]" onClick={()=>{setEditIndex(index);setShowAddModal(true);console.log(index);console.log(habits)}}></i>
                                <i className="fa-solid fa-trash hover:text-[#2C74B3] " onClick={()=>{setShowDeleteModal(true);setDeleteIndex(index)}}></i>
                            </div>                        
                        </React.Fragment>
                    ))}
                    
                    
                    </div>          

                    
                </div>
            
                    
            </div>
            <div id="switch-view" className={`md:hidden flex gap-[5vw] absolute bottom-1 left-1/2 -translate-x-1/2 transition-all`}>
                    <button className="bg-[#2C74B3] py-[0.2rem] px-[0.5rem] rounded-md whitespace-nowrap active:bg-[#1211112f]" onClick={()=>setDailyOrWeekly(0)}>All</button>
                    <button className="bg-[#2C74B3] py-[0.2rem] px-[0.5rem] rounded-md whitespace-nowrap active:bg-[#1211112f]" onClick={()=>setDailyOrWeekly(1)}>Daily</button>
                    <button className="bg-[#2C74B3] py-[0.2rem] px-[0.5rem] rounded-md whitespace-nowrap active:bg-[#1211112f]" onClick={()=>setDailyOrWeekly(2)}>Weekly</button>
                </div>

        </div>

    )
}