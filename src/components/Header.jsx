import { useNavigate } from "react-router-dom"

export default function Header(){

const navigate = useNavigate()

    return(
        <div className="flex justify-evenly font-mono font-bold text-2xl py-[2vh] cursor-default
        ">
            <span className="hover:bg-[#1211112f] transition-all hover:-translate-y-1 py-[1vh] px-[2vw] rounded-md"
            onClick={()=>navigate('/habits')}>Habits</span>
            <span className="hover:bg-[#1211112f] transition-all hover:-translate-y-1 py-[1vh] px-[2vw] rounded-md"
            onClick={()=>navigate('/pomodoro')}>Pomodoro</span>
        </div>
    )
}