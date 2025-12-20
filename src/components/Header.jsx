import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Header(){

    const location = useLocation()
    const [page, setPage] = useState('')

    useEffect(()=>{
        location.pathname === '/' ? setPage('habits') : setPage('pomodoro')
    },[])

const navigate = useNavigate()

    return(
        <div className="flex justify-evenly font-mono font-bold text-2xl py-[2vh] cursor-default
        ">
            <span className={`${page==='habits' ? 'bg-[#1211112f]' : 'hover:-translate-y-1' } hover:bg-[#1211112f] transition-all  py-[1vh] px-[2vw] rounded-md`}
            onClick={()=>{navigate('/');setPage('habits')}}>Habits</span>

            <span className={`${page==='pomodoro' ? 'bg-[#1211112f]' : 'hover:-translate-y-1' } hover:bg-[#1211112f] transition-all py-[1vh] px-[2vw] rounded-md`}
            onClick={()=>{navigate('/pomodoro');setPage('pomodoro')}}>Pomodoro</span>
        </div>
    )
}