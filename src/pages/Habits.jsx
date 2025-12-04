import { useEffect, useState } from 'react'
import {Header, AddModal} from '@/components'

export default function Habits(){

    const [showAddModal, setShowAddModal] = useState(true)




    useEffect(() => {
      document.body.style.backgroundColor = '#ff633e'
    
 
    }, [])
    

    return(
        <>
        <Header/>
        <div className={`${showAddModal ? 'translate-x-[100%]' : '-translate-x-[100%]'} absolute left-0 transition-all`}>
            <AddModal />    
        </div>
        

        
        <div id='streak-container' className='w-[90vw] m-auto border-white border-2 relative p-[2rem]'>
            <div className='absolute right-0 top-0 flex gap-[1rem] items-center justify-center cursor-default bg-[#1211112f] w-[10rem] rounded-[20rem] py-[0.5rem] px-[2rem]'
            onClick={()=>setShowAddModal(true)}>
                <i class="fa-solid fa-plus"></i>
                <span className='text-mono whitespace-nowrap'>Add Habit</span>
            </div>
    
        </div>


    
        
        </>
        
    )
}