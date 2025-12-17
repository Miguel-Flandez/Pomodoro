
import { useEffect, useState, useRef } from "react"
import { Header } from "@/components"

export default function Pomodoro(){

    const [selected, setSelected] = useState('Pomodoro')
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [start, setStart] = useState(false)
    const [pomoTracker, setPomoTracker ] = useState(1)
   
    const timerRef = useRef(null)
    const secondsLeft = useRef((minutes*60)+seconds)

    const clickSound = new Audio('/sounds/click.wav');
    const alarmSound = new Audio('/sounds/alarm.wav')



    useEffect(()=>{
      if(selected==='Pomodoro'){
          document.body.style.backgroundColor  = '#943030'
          const newMinutes = 25
          setMinutes(25)
          setSeconds(0)
          setStart(false)
          secondsLeft.current = 60*newMinutes
      
        }else if(selected==='Short'){
          document.body.style.backgroundColor  = '#25686C'
          const newMinutes = 5
          setMinutes(5)
          setSeconds(0)
          setStart(false)
          secondsLeft.current = 60*newMinutes
        }else{
          document.body.style.backgroundColor  = '#265678'
          const newMinutes = 15
          setMinutes(15)
          setSeconds(0)
          setStart(false)
          secondsLeft.current = 60*newMinutes
        }
    },[selected])


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
            
            if(pomoTracker===4){
              setSelected('Long')
              setPomoTracker(1)
            }else if(selected!=='Pomodoro'){
              setSelected('Pomodoro')
            }else{
              setPomoTracker(prev=>prev+1)
              setSelected('Short')  
            }
            alarmSound.play()
            clearInterval(timerRef.current)
            setStart(prev=>!prev)
        }
      }, 1000);

      return () => clearInterval(timerRef.current)
    }
  }, [start]);


    
    return(
      <>
      <Header/>
        <div className="flex flex-col gap-[5vw] items-center ">
          <span className="block font-bold text-[2rem] text-white mt-4 text-center">Cycle {pomoTracker}</span>
          <div className={`${selected==='Pomodoro' ? 'bg-[#852D2D]' : selected==='Short' ? 'bg-[#225F63]' : 'bg-[#234F6D]'} 
          rounded-md transition-colors duration-200 border-0 text-white text-md p-8 max-sm:w-[90%] flex flex-col items-center gap-[2rem]`}>   

              <div id="header buttons" className="flex items-center justify-center gap-[1vw] max-sm:text-xs cursor-pointer px-[1rem] whitespace-nowrap">
                  <span className={`px-4 py-2 rounded-sm ${selected==='Pomodoro' ? 'bg-[#1211112f]' : '' }`} onClick={()=>setSelected('Pomodoro')}>Pomodoro</span>
                  <span className={`px-4 py-2 rounded-sm ${selected==='Short' ? 'bg-[#1211112f]' : '' }`} onClick={()=>setSelected('Short')}>Short Break</span>
                  <span className={`px-4 py-2 rounded-sm ${selected==='Long' ? 'bg-[#1211112f]' : '' }`} onClick={()=>setSelected('Long')}>Long Break</span>
              </div>

          
              <span className="text-[5rem] font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              <div id="button-container" className="h-[4rem]">
                <button className={`bg-[#0E1011] rounded-md transition-colors duration-200 ${selected==='Pomodoro'?'text-[#C85757]' : selected==='Short' ? 'text-[#79CBD0]' : 'text-[#6EA8D0]'} font-bold px-[3rem] py-[1rem] ${start ? 'translate-y-1' : 'border-b-4 border-[#1A1D1F] '}`}
                onClick={()=>setStart(prev=>!prev, clickSound.play())}>{start?'PAUSE':'START'}</button>
              </div>
              
          </div>
        </div>
      </>
    )
}