import { useEffect, useState, useRef } from "react"

export default function Pomodoro(){

    const [selected, setSelected] = useState('Pomodoro')
    const [minutes, setMinutes] = useState(2)
    const [seconds, setSeconds] = useState(1)
    const [start, setStart] = useState(false)
   
    const timerRef = useRef(null)
    const secondsLeft = useRef((minutes*60)+seconds)


  useEffect(() => {
    if (start) {
      timerRef.current = setInterval(() => {
        if(secondsLeft.current){
            secondsLeft.current -= 1;
            const m = Math.floor(secondsLeft.current/60)
            const s = secondsLeft.current % 60

            setMinutes(m)
            setSeconds(s)
        }else{
            clearInterval(timerRef.current)
            setStart(false)
        }
      }, 1000);

      
    }

    return () => clearInterval(timerRef.current);
  }, [start]);


    
    return(
        <div className="absolute left-1/2 top-1/10 -translate-x-1/2 -translate-y-1.2 rounded-md
        bg-[#852D2D] border-0 text-white text-md font-mono p-8 h-[350px] flex flex-col items-center gap-8 ">   

            <div id="header buttons" className="flex items-center justify-center gap-16 cursor-pointer">
                <span className={`px-4 rounded-sm ${selected==='Pomodoro' ? 'bg-[#712626]' : '' }`} onClick={()=>setSelected('Pomodoro')}>Pomodoro</span>
                <span className={`px-4 rounded-sm ${selected==='Short' ? 'bg-[#712626]' : '' }`} onClick={()=>setSelected('Short')}>Short Break</span>
                <span className={`px-4 rounded-sm ${selected==='Long' ? 'bg-[#712626]' : '' }`} onClick={()=>setSelected('Long')}>Long Break</span>
            </div>

        
            <span className="text-9xl font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            
            <button className={`bg-[#0E1011] rounded-md text-[#C85757] font-bold font-mono px-12 py-4 ${start ? 'translate-y-1' : 'border-b-4 border-[#1A1D1F] '}`}
            onClick={()=>setStart(prev=>!prev)}>{start?'Pause':'Start'}</button>
        </div>
    )
}