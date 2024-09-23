import React from 'react'

const Contact = () => {
  return (
    <section>
        <div className='flex items-center justify-center mt-6'>
            <h1 className='text-3xl text-medium text-blue-600 border-b-blue-600 border-b-2 p-5'>Contact Us</h1>
        </div>
        <p className='leading-loose text-center text-medium my-10 text-l'>
        We’re here to help! Whether you have a question about products, <br/> need assistance with an order, or just want to share feedback, our team is ready to assist you.
        </p>
        <hr />
        <div className='flex items-center justify-center mt-6'>
            <h1 className='text-3xl text-medium text-blue-600 border-b-blue-600 border-b-2 p-5'>Get in Touch</h1>
        </div>
        <h1 className='text-2xl text-medium text-blue-600 p-5'>Customer Support</h1>
        <p className='text-l mx-10 mb-3'>Email: support@tradehub.com</p>
        <p className='text-l mx-10 mb-3'>Phone: 09 -794184997</p>
        <p className='text-l mx-10 mb-3'>Hours: 24 hours</p>
        <p className='text-l mx-10'>Address:</p>
        <p className='text-l mx-40'>TradeHub</p>
        <p className='text-l mx-40'>Yangon</p>
        <p className='text-l mx-40'>Myanmar</p>
        <div className="mt-5 text-sm font-medium text-center text-blue-600 pb-10">
              Developed By Frost @2024
          </div>
    </section>
  )
}

export default Contact