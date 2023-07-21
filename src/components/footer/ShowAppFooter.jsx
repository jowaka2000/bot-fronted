import React from 'react'

 const ShowAppFooter = () => {
  return (
    <div className='absolute bottom-0 bg-slate-700 w-full flex justify-end px-4'>
        <form>
            <button className='text-red-500'>Delete This App</button>
        </form>
    </div>
  );
}


export default ShowAppFooter;

