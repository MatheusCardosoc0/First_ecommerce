import React from 'react'

import {Product, FooterBanner, HeroBanner} from '../components'

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Melhores preços de moveis e eletrodomésticos</h2>
        <p>Dos mais variados tipos para facilitarem sua vida</p>
      </div>

      <div className='products-container'>
        {["product-1", "product-2"].map((product) => 
          product
        )}
      </div>

      footer
    </>
  )
}

export default Home
