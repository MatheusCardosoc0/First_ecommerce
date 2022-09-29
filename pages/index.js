import React from 'react'

import {Product, FooterBanner, HeroBanner} from '../components'
import { client } from '../lib/client'

const Home = ({ products, bannerData}) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      {console.log(bannerData)}

      <div className='products-heading'>
        <h2>Melhores preços de moveis e eletrodomésticos</h2>
        <p>Dos mais variados tipos para facilitarem sua vida</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => 
          <Product key={product._id} product={product} />
        )}
      </div>

      <FooterBanner FooterBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () =>{
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}
export default Home
