import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'

const Navbar = () => {

const {showCart, setShowCart, TotalQuantity} = useStateContext()

  return (
    <div className='navbar-container'>
      <p>
        <Link href={"/"}>CS Poltrona</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{TotalQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar