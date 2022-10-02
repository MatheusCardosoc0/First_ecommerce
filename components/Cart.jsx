import Link from 'next/link'
import { useRef } from 'react'
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'

const Cart = () => {
  const cartRef = useRef()

  const {
    TotalPrice,
    TotalQuantity,
    CartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove
  } = useStateContext()

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span>Seu carrinho</span>
          <span className="cart-num-items">{TotalQuantity} items</span>
        </button>

        {CartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Seu carrinho está vazio</h3>
            <Link href={'/'}>
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Começar compras
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {CartItems.length >= 1 &&
            CartItems.map((item, index) => (
              <div className="product" key={item?._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>$ {item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <div className="quantity">
                          <h3>Quantidade: </h3>
                          <p className="quantity-desc">
                            <span
                              className="minus"
                              onClick={() =>
                                toggleCartItemQuantity(item._id, 'dec')
                              }
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className="num">{item.quantity}</span>
                            <span
                              className="minus"
                              onClick={() =>
                                toggleCartItemQuantity(item._id, 'inc')
                              }
                            >
                              <AiOutlinePlus />
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          className="remove-item"
                          onClick={() => onRemove(item)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {CartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${TotalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn">
                Pague com Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
