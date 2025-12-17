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
        
        const newEntry = (function(){
            if(editIndex!==null){
                return habits.map((obj, i)=>{
                if(editIndex===i){
                    return {...obj, name:value1, schedule:value2}
                }else{
                    return {...obj}
                }
                })
            }else{
                return [...habits,{
                name: value1,
                schedule: value2,
                streak: 0,
                daysCompleted:[]
                }]
            }
            
        })()

        setHabits(newEntry);
        localStorage.setItem('habits', JSON.stringify(newEntry))
            
        console.log(habits)
    }

    // function for habit checkbox
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

    // deletes the selected habit
    function handleDelete(value){

        const deletedValue = (() => habits.filter((_,i)=>i!==deleteIndex))()
        if(value){
            setHabits(deletedValue)
            localStorage.setItem('habits', JSON.stringify(deletedValue))
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
        const stored = localStorage.getItem('habits')
        
        if(stored){
            setHabits(JSON.parse(stored))
        }

        // localStorage.setItem('habits', [])
    }, [])
    

    return(
        <MyContext.Provider value={{deleteChoice, setDeleteChoice, setHabits}}>
        <div className='h-screen overflow-hidden  bg-[#205295]'>

            <Header/>
            <div className={`${showAddModal ? '' : '-translate-x-[100vw] opacity-0'} fixed  top-0 left-0 transition-all z-50`}>
                <AddHabitModal addModalState={handleAddModal} habitHandler={handleHabitInput} editValues={habits[editIndex]} resetHandler={arg=> arg ? setEditIndex(null) : null}/>    
            </div>
            
                
            <div id='streak-container' className='flex flex-col w-[90vw] m-auto gap-[2vw] '>
                <div className='grid grid-cols-[2fr_repeat(7,1fr)_2fr] gap-[2vw] items-center'>
                    <div className='text-[2rem] font-bold'>{todate.toLocaleString("default", {month:"long"})}</div>
                            
                        {sortedDays.map((day,i)=>(
                            <div className='flex flex-col' key={day}>
                                <span>{day}</span>
                                <span>{lastSevenDates[i]}</span>
                            </div>
                            
                        ))}
                            
                        <div className='flex'>
                            <button className={`${showAddModal? 'hidden' : ''} flex gap-[1rem] items-center justify-center cursor-default hover:bg-[#1211112f] hover:rounded-md py-[0.5rem] px-[1rem]`}
                                onClick={()=>setShowAddModal(true)}>
                                <i className="fa-solid fa-plus"></i>
                                <span className='whitespace-nowrap'>Add Habit</span>
                            </button>
                            {/* for testing */}
                            <button id="reset" className='hover:bg-red-800' onClick={()=>{localStorage.setItem('habits', []);setHabits([])}}>reset</button>
                            <div className={`${!showAddModal ? 'hidden' : ''}`}></div>
                        </div>
                        
                    

                    
                </div>
            
                    
                <div id="streaks" className='grid grid-cols-[2fr_repeat(7,1fr)_2fr] gap-[2vw] auto-rows-min overflow-auto h-[80vh]'>
                    {habits.map((habit, index)=>(
                        <React.Fragment key={index}>
                            <span className="habit">{habit.name}</span>
                            {sortedDays.map((day, id)=>{
                                const date = new Date()
                                date.setDate(todate.getDate() - (6-id))    
                            
                            return(
                                <React.Fragment key={id}>
                                    <button className={`${habit.daysCompleted.find(e=>e===date.getDate()) ? 'bg-white' : ''} ${habit.schedule?.find(n=>n===day)? '' : 'border-transparent! bg-transparent!'} border-2 rounded-md w-[2rem] h-[2rem]`}
                                    onClick={()=>checkHabit(index, date.getDate())}></button>
                                </React.Fragment>
                            )})} 
                            
                            <div className='flex justify-evenly'>
                                <i className="fa-solid fa-pen-to-square hover:text-[#1211112f]" onClick={()=>{setEditIndex(index);setShowAddModal(true);console.log(index);console.log(habits)}}></i>
                                <i className="fa-solid fa-trash hover:text-[#1211112f]" onClick={()=>{setShowDeleteModal(true);setDeleteIndex(index)}}></i>
                            </div>                        
                        </React.Fragment>
                    ))}
                    {showDeleteModal && <DeleteModal deleteHandler={handleDelete}/>}
                    
                </div>
                
            </div>
        </div>
       
        
        
        </MyContext.Provider>
        
    )
}