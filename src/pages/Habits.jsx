import { useEffect, useMemo, useState } from 'react'
import {Header, AddHabitModal, DeleteModal} from '@/components'
import { MyContext } from '@/context'
import React from 'react'


export default function Habits(){

    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [deleteChoice, setDeleteChoice] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [habits, setHabits] = useState([])

    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const today = new Date().getDay()

    const sortedDays = useMemo(()=>{
        return [...days.slice(today+1), ...days.slice(0, today+1)]
    })
    
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

    })
    


    // shows the add modal
    function handleAddModal(value){
        setShowAddModal(value)
    }   

    // inputs the habit name and schedule
    function handleHabitInput(value1, value2){
        setHabits(prev=>[...prev,{
            name: value1,
            schedule: value2,
            streak: 0,
        }])
        console.log(habits)
    }

    // deletes the selected habit
    function handleDelete(value){
        if(value){
            setHabits(prev=>prev.filter((_,i)=>i!==deleteIndex))
            setDeleteIndex(null)
            setShowDeleteModal(false)
            console.log(habits)
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
            <AddHabitModal addModalState={handleAddModal} habitHandler={handleHabitInput}/>    
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
                        {sortedDays.map((day, id)=>(
                            <div key={id} className={`${habit.schedule?.find(n=>n===day)? '' : 'border-transparent! '} border-2 border-white rounded-md w-[2rem] h-[2rem]`}></div>
                        ))} 
                        
                        <div className='flex'>
                            <i class="fa-solid fa-pen-to-square"></i>
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