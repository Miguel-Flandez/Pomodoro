import { useEffect, useState } from 'react'
import {Header, AddModal} from '@/components'
import '@/css/tables.css'

export default function Habits(){

    const [showAddModal, setShowAddModal] = useState(true)

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


    function handleModal(value){
        setShowAddModal(value)
    }




    useEffect(() => {
      document.body.style.backgroundColor = '#ff633e'
    
 
    }, [])
    

    return(
        <>
        <Header/>
        <div className={`${showAddModal ? '' : '-translate-x-[100vw]'} fixed w-[30%] top-0 left-0 transition-all z-50`}>
            <AddModal modalState={handleModal}/>    
        </div>
        

        
        <div id='streak-container' className='w-[90vw] m-auto relative p-[2rem]'>
            

            <div id="streaks" className='grid grid-cols-[2fr_repeat(7,1fr)] gap-[2vw]'>
                <div></div>
                {days.map(day=>(
                    <span key={day}>{day}</span>
                ))}

                <span className="habit">asdasd</span>
                {days.map((_, id)=>(
                    <div key={id}></div>
                ))} 
            </div>
            
        </div>

        <button className='absolute right-1/2 translate-x-1/2  bottom-2  flex gap-[1rem] items-center justify-center cursor-default hover:bg-[#1211112f] w-[10rem] hover:rounded-md py-[0.5rem] px-[2rem]'
        onClick={()=>setShowAddModal(true)}>
            <i class="fa-solid fa-plus"></i>
            <span className='text-mono whitespace-nowrap'>Add Habit</span>
        </button>

       
        
        
        </>
        
    )
}