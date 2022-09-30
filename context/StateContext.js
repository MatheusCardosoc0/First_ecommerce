import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [CartItems, setCartItems] = useState([])
  const [TotalPrice, setTotalPrice] = useState()
  const [TotalQuantity, setTotalQuantity] = useState()
  const [Qty, setQty] = useState(1)

  const onAdd = (product, quantity) => {
    const checkProductInCart = CartItems.find(item => item._id === product._id)

    if (checkProductInCart) {
      setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
      setTotalQuantity(prevTotalQuantities => prevTotalQuantities + quantity)

      const updatedCartItems = CartItems.map(cartProduct => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems([...CartItems, { ...product }])
    }

    toast.success(`${Qty} ${product.name} adicionado ao carrinho`)
  }

  const incQty = () => {
    setQty(prevQty => prevQty + 1)
  }

  const decQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        CartItems,
        Qty,
        TotalPrice,
        TotalQuantity,
        incQty,
        decQty,
        onAdd
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
