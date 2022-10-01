import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [CartItems, setCartItems] = useState([])
  const [TotalPrice, setTotalPrice] = useState(0)
  const [TotalQuantity, setTotalQuantity] = useState(0)
  const [Qty, setQty] = useState(1)

  console.log(TotalQuantity)

  const onAdd = (product, quantity) => {
    const checkProductInCart = CartItems.find(item => item?._id === product?._id)

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity + quantity)
    console.log(TotalPrice)

    if (checkProductInCart) {
      const updatedCartItems = CartItems.map(cartProduct => {
        if (cartProduct?._id === product?._id)
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
        onAdd,
        setShowCart
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
