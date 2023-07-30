import React from 'react'

 const ShowAppFooter = () => {
  return (
    <div className='absolute bottom-0  w-[97%] flex justify-end px-4 py-10'>
        <form>
            <button className='text-red-500'>Delete This App</button>
        </form>
    </div>
  );
}


export default ShowAppFooter;

