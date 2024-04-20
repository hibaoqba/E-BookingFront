import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FaQuestionCircle } from "react-icons/fa";
import '../../styles/FAQs.css'
const FAQS = () => {
  return (
    <div>
      <Accordion  >
       
          <Accordion.Item eventKey="0">
            <Accordion.Header>
                <h5><FaQuestionCircle/> When should I check the transmission fluid?</h5>
               
            </Accordion.Header>
            <Accordion.Body>
              You should check the transmission fluid regularly. Try to check it at least once a month or at the sign of any trouble, for instance if there is any hesitation when you shift gears in an automatic.
            </Accordion.Body>
          </Accordion.Item>
    
        
    
          <Accordion.Item eventKey="1">
            <Accordion.Header>
        

              
                <h5><FaQuestionCircle/> How do I check the transmission fluid?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              It’s not hard to check your transmission fluid if the vehicle is an automatic. This link to the Dummies guide to checking your transmission fluid has step-by-step instructions and illustrations that show you where to locate the dipstick. What you want is clear, pink transmission fluid. If it is low, top it up. If it is dark, smells burnt or has bits in it then you need to get it changed by at a reliable auto repair shop.
            </Accordion.Body>
          </Accordion.Item>
     
        
        
          <Accordion.Item eventKey="2">
            <Accordion.Header>
           

                <h5> <FaQuestionCircle/> Is it really that important to check the transmission fluid?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              Yes, it can be. Often times the symptoms you’ll experience from low or dirty transmission fluid will be the same as transmission problems. If you check the fluid levels regularly and refill as necessary then you’ll know if there are any symptoms of trouble that it’s not because the fluid levels are low and you need to see a mechanic.
            </Accordion.Body>
          </Accordion.Item>
      
        
  
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              
                <h5> <FaQuestionCircle/> Are there different types of transmission fluid?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
             
            </Accordion.Header>
            <Accordion.Body>
              How do I know what to buy? Yes, there are many different types of transmission fluid, each designed for a certain transmission. Different vehicles require different transmission fluids and the age of the car can also be a factor because newer transmissions take different types of transmission fluids than older vehicles. Don’t guess! Find out which type of transmission fluid is required for your vehicle by checking your owner’s manual.
            </Accordion.Body>
          </Accordion.Item>
 
        
      
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              
                <h5> <FaQuestionCircle/> What is a transmission flush and should I get one?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              A transmission flush is used by some auto repair shops with the goal of flushing out debris.  Auto Tech does not do any sort of transmission flush.  Flushing an older transmission can cause harmful sediment to get stuck in the solenoids of the transmission. We heavily favor regular maintenance to lengthen the life of your transmission.  We service the transmission by changing fluid and the filter and do not recommend having your transmission flushed.
            </Accordion.Body>
          </Accordion.Item>
       
        
    
          <Accordion.Item eventKey="5">
            <Accordion.Header>
             
                <h5><FaQuestionCircle/> How do I know I have a fluid leak from the transmission?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              Transmission fluid is slightly pink in color – it will appear pink or red, or possibly more brownish if the transmission fluid is dirty and needs to be replaced. When you feel transmission fluid it will be slick and oily on your fingers. It smells much like oil unless it is dirty, in which case it will smell burnt. Usually transmission fluid leaks around the front or middle of your vehicle, so if you find puddles of reddish liquid there it is probably transmission fluid. Another clue is if in addition to the leak your transmission is not working well and you notice changes in the way it sounds when you shift gears, or if shifting gears is not working as well. In this case you likely have a leak of transmission fluid that is impacting how your transmission operates.
            </Accordion.Body>
          </Accordion.Item>
     
      </Accordion>
    </div>
  );
};

export default FAQS;
