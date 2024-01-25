import { Button } from 'flowbite-react'
import React from 'react'



export default function CallToAction() {

    return (
        <div className=" flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className='flex-1 justify-center flex flex-col gap-2'>
                <h2 className='text-2xl font-semibold'>
                    Want to learn more about ReactJs
                </h2>
                <p className='text-gray-500 font-medium'>
                    Checkout these resources with 100 ReactJs Projects
                </p>
                <Button gradientDuoTone='purpleToPink' className='rounded-tr-xl'>
                    <a href="https://legacy.reactjs.org/tutorial/tutorial.html" target='_blank'>LearnMore</a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img className='rounded-xl shadow-sm' src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" alt="image" />
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbjtzi7IjHlC6U9ZlTRH8x8tFI8ZywWolFWw&usqp=CAU" alt="image" /> */}
            </div>
        </div>
    )
}
