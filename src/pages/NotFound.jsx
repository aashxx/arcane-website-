import React from 'react'

const NotFound = () => {
  return (
    <main className='min-h-screen bg-black flex flex-col items-center justify-center w-full py-24 px-6'>
        <div className='relative max-w-[500px]'>
            <img className='rounded-full' src="https://i.postimg.cc/3JTHrNvh/DALL-E-2024-09-05-12-20-50-A-digital-artwork-inspired-by-the-Arcane-series-depicting-a-character.webp" alt="404" />
            <div className="absolute rounded-full inset-0 transition-opacity duration-300 bg-gradient-to-t from-arcane-primary to-transparent" />
        </div>
    </main>
  )
}

export default NotFound