import React from 'react'

export const CarouselItem = ({image, title}) => {
  return (
    <div className='flex flex-col justify-center items-center cursor-pointer group'>
        <div className="w-[8rem] h-[8rem] lg:h-[11rem] mb-2 lg:w-[11rem] overflow-hidden rounded-full shadow-sm group-hover:shadow-md transition-shadow">
            <img className='w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300' src={image} alt={title} />
        </div>
        <span className='py-2 font-medium text-lg text-gray-800'>{title}</span>
    </div>
  )
}
