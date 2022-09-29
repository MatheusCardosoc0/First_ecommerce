import React from 'react'
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 CS Poltronas de todos os tipos, direitos reservados</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiFillTwitterCircle />
      </p>
    </div>
    
  )
}

export default Footer
