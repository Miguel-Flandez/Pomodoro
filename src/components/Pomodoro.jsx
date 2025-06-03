import { useState } from "react"

export default function Pomodoro(){

    const [selected, setSelected] = useState('Pomodoro')
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)

    return(
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1.2 rounded-md
        bg-[#852D2D] border-0 text-white text-md font-mono p-4 flex flex-col items-center gap-8 ">   

            <div id="header buttons" className="flex items-center justify-center gap-16 cursor-pointer">
                <span className={`px-4 rounded-sm ${selected==='Pomodoro' ? 'bg-[#712626]' : '' }`} onClick={()=>setSelected('Pomodoro')}>Pomodoro</span>
                <span className={`px-4 rounded-sm ${selected==='Short' ? 'bg-[#712626]' : '' }`} onClick={()=>setSelected('Short')}>Short Break</span>
                <span className={`px-4 rounded-sm ${selected==='Long' ? 'bg-[#712626]' : '' }`} onClick={()=>setSelected('Long')}>Long Break</span>
            </div>

        
            <span className="text-9xl font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            
            <button className={`bg-[#0E1011] rounded-md text-[#C85757] font-bold font-mono px-12 py-4`}>START</button>
        </div>
    )
}