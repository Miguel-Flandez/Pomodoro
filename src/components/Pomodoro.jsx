import { useEffect, useState, useRef } from "react"

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

  useEffect(()=>{
    
    document.body.style.transition = 'background-color 1s ease-out'
  }),[]


    
    return(
        <>
          <span className="block font-bold text-4xl text-white font-mono mt-4 text-center">Cycle {pomoTracker}</span>
          <div className={`absolute left-1/2 top-1/6 -translate-x-1/2 -translate-y-1.2 rounded-md
          ${selected==='Pomodoro' ? 'bg-[#852D2D]' : selected==='Short' ? 'bg-[#225F63]' : 'bg-[#234F6D]'} transition-colors duration-1000 border-0 text-white text-md font-mono p-8 h-[350px] flex flex-col items-center gap-8 `}>   

              <div id="header buttons" className="flex items-center justify-center gap-4 cursor-pointer px-4">
                  <span className={`px-4 py-2 rounded-sm ${selected==='Pomodoro' ? 'bg-[#1211112f]' : '' }`} onClick={()=>setSelected('Pomodoro')}>Pomodoro</span>
                  <span className={`px-4 py-2 rounded-sm ${selected==='Short' ? 'bg-[#1211112f]' : '' }`} onClick={()=>setSelected('Short')}>Short Break</span>
                  <span className={`px-4 py-2 rounded-sm ${selected==='Long' ? 'bg-[#1211112f]' : '' }`} onClick={()=>setSelected('Long')}>Long Break</span>
              </div>

          
              <span className="text-9xl font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              
              <button className={`bg-[#0E1011] rounded-md transition-colors duration ${selected==='Pomodoro'?'text-[#C85757]' : selected==='Short' ? 'text-[#79CBD0]' : 'text-[#6EA8D0]'} font-bold font-mono px-12 py-4 ${start ? 'translate-y-1' : 'border-b-4 border-[#1A1D1F] '}`}
              onClick={()=>setStart(prev=>!prev, clickSound.play())}>{start?'PAUSE':'START'}</button>
          </div>
        </>
    )
}