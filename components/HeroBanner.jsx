import Link from 'next/link'
import React from 'react'

const HeroBanner = () => {
  return (
  <div className='hero-banner-container'>
    <div>
      <p className='beats-solo'>Small text</p>
      <h3>Mid text</h3>
      <img src='' alt='Poltrona' className='hero-banner-image' />

      <div>
        <Link href={"/product/:id"}>
          <button type={"button"}>Button text</button>
        </Link>
        <div className='desc'>
          <h5>Description</h5>
          <p>Description</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeroBanner
