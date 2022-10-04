import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [CartItems, setCartItems] = useState([])
  const [TotalPrice, setTotalPrice] = useState(0)
  const [TotalQuantity, setTotalQuantity] = useState(0)
  const [Qty, setQty] = useState(1)

  let foundProduct
  let index

  const onAdd = (product, quantity) => {
    const checkProductInCart = CartItems.find(
      item => item?._id === product?._id
    )

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
    setTotalQuantity(prevTotalQuantity => prevTotalQuantity + quantity)

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




  const onRemove = product => {
    foundProduct = CartItems.find(item => item._id === product._id)
    const newCartItems = CartItems.filter(item => item._id !== product._id)

    setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantity(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }


  

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = CartItems.find(item => item._id === id)
    index = CartItems.findIndex(product => product._id === id)

    const newCartItems = CartItems.filter(item => item._id !== id)

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 }
      ])
      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
      setTotalQuantity(prevTotalQuantities => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 }
        ])
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
        setTotalQuantity(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
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
        setShowCart,
        CartItems,
        Qty,
        TotalPrice,
        TotalQuantity,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
