import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
const faqData = [
    {
      question: "What is your return policy?",
      answer: "You can return any item within 30 days of purchase for a full refund, provided the item is in its original condition."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 3-5 business days, depending on your location."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer worldwide shipping! Delivery times vary by region."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has shipped, you’ll receive a tracking number via email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and other secure payment options."
    }
  ];
const QandA = () => {
        const [activeIndex, setActiveIndex] = useState(null);
      
        const toggleAnswer = (index) => {
          if (activeIndex === index) {
            setActiveIndex(null);  // Close the answer if it's already open
          } else {
            setActiveIndex(index); // Open the selected answer
          }
        };
      
        return (
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 className='text-2xl mb-5'>Frequently Asked Questions</h1>
            {faqData.map((faq, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div 
                    className='flex justify-between'
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    color: activeIndex === index ? '#007BFF' : '#333',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '10px'
                  }}
                  onClick={() => (toggleAnswer(index), setIsDown(true))}
                >
                  {faq.question}
                  <ChevronDownIcon width={20} height={20}/>
                </div>
                {activeIndex === index && (
                  <div className='flex justify-between' style={{ marginTop: '10px', color: '#555' }}>
                    {faq.answer}
                    
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      };

export default QandA