
export default function AddModal({modalState}){

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']



    return(
        <div id="modal-container" className="h-screen relative bg-blue-600 flex flex-col items-center py-[2rem] px-[1rem] gap-[10rem] rounded-r-4xl">

            <div className="flex items-center gap-[2vw]">
                <span className="text-[4rem] font-bold whitespace-nowrap">Add a Habit</span>
                <button onClick={()=>modalState(false)}>
                    <i class="fa-solid fa-xmark transition-transform hover:scale-120 text-[3rem]"></i>
                </button>
            </div>
            

            

            <div id="add" className="flex flex-col w-[90%]">
                <label htmlFor="habit" className="text-[2rem]">Name this Habit</label>
                <input type="text" id="habit" className="border-2 text-[2rem] border-white rounded-sm h-[3rem]"/>
            </div>

            <div id="frequency" className="w-full flex justify-evenly">
                {days.map(day=>(
                    <button key={day} className="text-[1rem] border-1 border-white rounded-md px-[1rem] py-[0.25rem] hover:border-">{day}</button>
                ))}
            </div>

        </div>
    )
}