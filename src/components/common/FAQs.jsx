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
                <h5><FaQuestionCircle/> Quand devrais-je vérifier le liquide de transmission ?</h5>
               
            </Accordion.Header>
            <Accordion.Body>
              Vous devriez vérifier le liquide de transmission régulièrement. Essayez de le vérifier au moins une fois par mois ou dès qu'il y a un signe de problème, par exemple s'il y a une hésitation lorsque vous changez de vitesse dans une automatique.
            </Accordion.Body>
          </Accordion.Item>
    
        
    
          <Accordion.Item eventKey="1">
            <Accordion.Header>
        

              
                <h5><FaQuestionCircle/> Comment vérifier le liquide de transmission ?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              Ce n'est pas difficile de vérifier votre liquide de transmission si le véhicule est une automatique. Ce lien vers le guide Dummies pour vérifier votre liquide de transmission propose des instructions étape par étape et des illustrations qui montrent où trouver la jauge. Ce que vous voulez, c'est un liquide de transmission clair et rose. S'il est bas, remplissez-le. S'il est sombre, sent le brûlé ou contient des particules, alors vous devez le faire changer dans un atelier de réparation auto fiable.
            </Accordion.Body>
          </Accordion.Item>
     
        
        
          <Accordion.Item eventKey="2">
            <Accordion.Header>
           

                <h5> <FaQuestionCircle/> Est-il vraiment important de vérifier le liquide de transmission ?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              Oui, cela peut l'être. Souvent, les symptômes que vous ressentirez à cause d'un liquide de transmission bas ou sale seront les mêmes que des problèmes de transmission. Si vous vérifiez régulièrement les niveaux de liquide et les remplissez si nécessaire, alors vous saurez que si vous rencontrez des symptômes de problème, ce n'est pas à cause des niveaux de liquide et vous devez consulter un mécanicien.
            </Accordion.Body>
          </Accordion.Item>
      
        
  
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              
                <h5> <FaQuestionCircle/> Existe-t-il différents types de liquide de transmission ?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
             
            </Accordion.Header>
            <Accordion.Body>
              Comment savoir quoi acheter ? Oui, il existe de nombreux types de liquide de transmission, chacun conçu pour une certaine transmission. Différents véhicules nécessitent différents liquides de transmission et l'âge de la voiture peut également être un facteur, car les transmissions plus récentes prennent des types de liquides de transmission différents des véhicules plus anciens. Ne devinez pas ! Découvrez quel type de liquide de transmission est requis pour votre véhicule en consultant votre manuel du propriétaire.
            </Accordion.Body>
          </Accordion.Item>
 
        
      
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              
                <h5> <FaQuestionCircle/> Qu'est-ce qu'une vidange de transmission et devrais-je en faire une ?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              Une vidange de transmission est utilisée par certains ateliers de réparation automobile dans le but de chasser les débris. Auto Tech ne fait aucune sorte de vidange de transmission. Flusher une transmission plus ancienne peut causer des sédiments nocifs qui peuvent se coincer dans les solénoïdes de la transmission. Nous favorisons fortement l'entretien régulier pour prolonger la durée de vie de votre transmission. Nous entretenons la transmission en changeant le liquide et le filtre et ne recommandons pas de faire vidanger votre transmission.
            </Accordion.Body>
          </Accordion.Item>
       
        
    
          <Accordion.Item eventKey="5">
            <Accordion.Header>
             
                <h5><FaQuestionCircle/> Comment savoir si j'ai une fuite de liquide de transmission ?</h5>
                <span className="arrow"><i className="fa fa-angle-down"></i></span>
              
            </Accordion.Header>
            <Accordion.Body>
              Le liquide de transmission est légèrement rose – il apparaîtra rose ou rouge, ou peut-être plus brunâtre si le liquide de transmission est sale et doit être remplacé. Lorsque vous touchez le liquide de transmission, il sera glissant et huileux sur vos doigts. Il sent beaucoup comme l'huile à moins qu'il ne soit sale, auquel cas il sentira le brûlé. Habituellement, les fuites de liquide de transmission se trouvent à l'avant ou au milieu de votre véhicule, donc si vous trouvez des flaques de liquide rougeâtre à ces endroits, c'est probablement du liquide de transmission. Un autre indice est que si en plus de la fuite votre transmission ne fonctionne pas bien et que vous remarquez des changements dans le son lorsque vous changez de vitesse, ou si le changement de vitesse ne fonctionne pas aussi bien. Dans ce cas, vous avez probablement une fuite de liquide de transmission qui affecte le fonctionnement de votre transmission.
            </Accordion.Body>
          </Accordion.Item>
     
      </Accordion>
    </div>
  );
};

export default FAQS;
