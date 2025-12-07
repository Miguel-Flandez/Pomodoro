import { useEffect, useState } from 'react'
import {Header, AddModal, DeleteModal} from '@/components'
import { MyContext } from '@/context'
import React from 'react'


export default function Habits(){

    

    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteChoice, setDeleteChoice] = useState(null)
    const [habits, setHabits] = useState([])
    

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


    function handleModal(value){
        setShowAddModal(value)
    }

    function handleHabitInput(value1, value2){
        setHabits(prev=>[...prev,{
            name: value1,
            schedule: value2
        }])
        console.log(habits)
    }

    // function handleDelete(bool){
    //     setShowDeleteModal(false)
    // }

    useEffect(()=>{
        setShowDeleteModal(false)
    }, [deleteChoice])
        
    useEffect(() => {
      document.body.style.backgroundColor = '#ff633e'
        
 
    }, [])
    

    return(
        <MyContext.Provider value={{deleteChoice, setDeleteChoice}}>
        <Header/>
        <div className={`${showAddModal ? '' : '-translate-x-[100vw]'} fixed w-[30%] top-0 left-0 transition-all z-50`}>
            <AddModal modalState={handleModal} habitHandler={handleHabitInput}/>    
        </div>
        

        
        <div id='streak-container' className='w-[90vw] m-auto p-[2rem]'>
            

            <div id="streaks" className='grid grid-cols-[2fr_repeat(7,1fr)_0.25fr] gap-[2vw] items-center'>
                <div></div>
                {days.map(day=>(
                    <span key={day}>{day}</span>
                ))}
                <div></div>

                {habits.map((habit, index)=>(
                    <React.Fragment key={index}>
                        <span className="habit">{habit.name}</span>
                        {days.map((day, id)=>(
                            <div key={id} className={`${habit.schedule?.find(n=>n===day)? '' : 'border-transparent! '} border-2 border-white rounded-md w-[2rem] h-[2rem]`}></div>
                        ))} 
                        
                        <div className='flex'>
                            <i class="fa-solid fa-pen-to-square"></i>
                            <i class="fa-solid fa-trash" onClick={()=>setShowDeleteModal(true)}></i>
                            
                            {showDeleteModal && <DeleteModal />}
                            
                            
                        </div>
                        
                        
                    </React.Fragment>
                ))}
                
            </div>
            
        </div>

        <button className='absolute right-1/2 translate-x-1/2  bottom-2  flex gap-[1rem] items-center justify-center cursor-default hover:bg-[#1211112f] w-[10rem] hover:rounded-md py-[0.5rem] px-[2rem]'
        onClick={()=>setShowAddModal(true)}>
            <i class="fa-solid fa-plus"></i>
            <span className='text-mono whitespace-nowrap'>Add Habit</span>
        </button>

       
        
        
        </MyContext.Provider>
        
    )
}