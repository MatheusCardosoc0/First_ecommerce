import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar
} from 'react-icons/ai'
import Product from '../../components/Product'
import { useStateContext } from '../../context/StateContext'

const ProductsDetails = ({ product, products }) => {
  const { image, name, details, price } = product
  const [index, setIndex] = useState(0)
  const {decQty, incQty, Qty, onAdd} = useStateContext()

  return (
    <div>
      <div className="product-detail-container">
        <div className='flex'>
          <div>
            <div className="image-container">
              <img
                className="product-detail-image"
                src={urlFor(image && image[index])}
              />
            </div>
            <div className="small-images-container">
              {image?.map((item, i) => {
                return (
                  <img key={i}
                    src={urlFor(item)}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={() => setIndex(i)}
                  />
                )
              })}
            </div>
          </div>
          <div>
          <div className="product-detail-desc">
            <h1>{name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4>Detalhes: </h4>
            <p>{details}</p>
            <p className="price">R$ {price}</p>
          </div>
          <div className="quantity">
            <h3>Quantidade: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" >
                {Qty}
              </span>
              <span className="minus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, Qty)}>
              Adicionar ao carrinho
            </button>
            <button type="button" className="buy-now">
              Compre agora
            </button>
          </div>
        </div>
      </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>Você também poderia gostar disso</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map(item => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }
  `

  const products = await client.fetch(query)

  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product }
  }
}

export default ProductsDetails
