import { useEffect, useMemo, useState } from 'react'
import {Header, AddHabitModal, DeleteModal} from '@/components'
import { MyContext } from '@/context'
import React from 'react'


export default function Habits(){

    // state for showing and hiding modals
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [editIndex, setEditIndex] = useState(null)

    // state for confirming delete and index of the item to be deleted
    const [deleteChoice, setDeleteChoice] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [habits, setHabits] = useState([])

    // days sorted with current day at the rightmost
    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date().getDay()
    const sortedDays = useMemo(()=>{
        return [...days.slice(today+1), ...days.slice(0, today+1)]
    },[])
    
    // last seven days 
    const todate = new Date()
    const lastSevenDates = useMemo(()=>{
        let arr = []

        for(let i = 6; i>=0; i--){
            const date = new Date()
            date.setDate(todate.getDate()-i)
            arr.push(String(date.getDate()).padStart(2, '0'))
        }
        console.log(arr)
        return arr

    }, [])
    


    // shows the add modal
    function handleAddModal(value){
        setShowAddModal(value)
    }   

    // inputs the habit name and schedule
    function handleHabitInput(value1, value2){
        setHabits(prev=>{
            if(editIndex!==null){
                return prev.map((obj, i)=>{
                if(editIndex===i){
                    return {...obj, name:value1, schedule:value2}
                }else{
                    return {...obj}
                }
                })
            }else{
                return [...prev,{
                name: value1,
                schedule: value2,
                streak: 0,
                daysCompleted:[]
                }]
            }
            
        }
            
    )
        console.log(habits)
    }

    // function for habit checkbox
    function checkHabit(habitIndex, date){
        setHabits(prev=>{            
                return prev.map((habit, index)=>habitIndex===index ?{
                ...habit, 
                daysCompleted: habit.daysCompleted.find(i=>i===date) ? habit.daysCompleted.filter(i=>i!==date) : [...habit.daysCompleted, date]
                } : habit

                
            )}
        )
    }

    // deletes the selected habit
    function handleDelete(value){
        if(value){
            setHabits(prev=>prev.filter((_,i)=>i!==deleteIndex))
            setDeleteIndex(null)
            setShowDeleteModal(false)
            return
        }else{
            setDeleteIndex(null)
            setShowDeleteModal(false)
            return
        }

    }

    // sets the body's color
    useEffect(() => {
      document.body.style.backgroundColor = '#ff633e'
    }, [])
    

    return(
        <MyContext.Provider value={{deleteChoice, setDeleteChoice, setHabits}}>
        <Header/>
        <div className={`${showAddModal ? '' : '-translate-x-[100vw]'} fixed w-[30%] top-0 left-0 transition-all z-50`}>
            <AddHabitModal addModalState={handleAddModal} habitHandler={handleHabitInput} editValues={habits[editIndex]} resetHandler={arg=> arg ? setEditIndex(null) : null}/>    
        </div>
        

        
        <div id='streak-container' className='w-[90vw] m-auto p-[2rem]'>
            

            <div id="streaks" className='grid grid-cols-[2fr_repeat(7,1fr)_0.25fr] gap-[2vw] items-center'>
                <div></div>
                    
                    {sortedDays.map((day,i)=>(
                        <div className='flex flex-col' key={day}>
                            <span>{day}</span>
                            <span>{lastSevenDates[i]}</span>
                        </div>
                        
                    ))}
                    
                <div></div>

                {habits.map((habit, index)=>(
                    <React.Fragment key={index}>
                        <span className="habit">{habit.name}</span>
                        {sortedDays.map((day, id)=>{
                            const date = new Date()
                            date.setDate(todate.getDate() - (6-id))    
                        
                        return(
                            <div key={id} className={`${habit.daysCompleted.find(e=>e===date.getDate()) ? 'bg-white' : ''} ${habit.schedule?.find(n=>n===day)? '' : 'border-transparent! '} border-2 border-white rounded-md w-[2rem] h-[2rem]`}
                             onClick={()=>checkHabit(index, date.getDate())}></div>
                        )})} 
                        
                        <div className='flex'>
                            <i class="fa-solid fa-pen-to-square" onClick={()=>{setEditIndex(index);setShowAddModal(true);console.log(index);console.log(habits)}}></i>
                            <i class="fa-solid fa-trash" onClick={()=>{setShowDeleteModal(true);setDeleteIndex(index)}}></i>
                        </div>                        
                    </React.Fragment>
                ))}
                {showDeleteModal && <DeleteModal deleteHandler={handleDelete}/>}
                
            </div>
            
        </div>

        <button className={`${showAddModal? 'hidden' : ''} absolute right-1/2 translate-x-1/2  bottom-2  flex gap-[1rem] items-center justify-center cursor-default hover:bg-[#1211112f] w-[10rem] hover:rounded-md py-[0.5rem] px-[2rem]`}
        onClick={()=>setShowAddModal(true)}>
            <i class="fa-solid fa-plus"></i>
            <span className='text-mono whitespace-nowrap'>Add Habit</span>
        </button>

       
        
        
        </MyContext.Provider>
        
    )
}