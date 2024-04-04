import React from 'react';
import './agadirDescription.css';
import { Map, Marker } from 'pigeon-maps';
const AgadirDescription = () => {
  return (
    <div className="agadir-description">
      <div className="bg-img">
        <div className="container">
          
            <h1 className="header">AGADIR</h1>
          </div>
        
      </div>

      <div className="content">
        <div className="container">
          <h2 className="section-title">Bienvenue sur AGADIR</h2>
          <div className="line-wrapper">
        <div className="line"></div>
        </div>
         <div className="description">
            <p className="intro">
              Agadir est une magnifique ville située sur la côte atlantique du Maroc. Elle est réputée pour son climat doux, ses plages de sable doré et sa culture riche. Voici un descriptif de cette ville captivante :
            </p>
            <ul>
              <li>
                <span>Les plages :</span> Agadir est célèbre pour ses plages magnifiques qui s'étendent sur des kilomètres le long de la côte atlantique. Les plages d'Agadir offrent des conditions idéales pour la baignade, la détente au soleil et la pratique de sports nautiques tels que le surf. La plage d'Agadir est la plus connue, offrant une vue imprenable sur l'océan et une promenade bordée de restaurants et de cafés.
              </li>
            </ul>
            <ul>
              <li>
                <span>La culture :</span> La ville d'Agadir a une histoire riche, bien que la majeure partie de son patrimoine ait été détruite lors du tremblement de terre de 1960. Cependant, Agadir a su reconstruire son identité culturelle et propose désormais des musées, des galeries d'art et des festivals pour mettre en avant son histoire et sa culture berbère. Le musée municipal d'Agadir est un lieu incontournable pour en apprendre davantage sur l'histoire de la ville.
              </li>
            </ul>
            <ul>
              <li>
                <span>La cuisine :</span> La gastronomie d'Agadir est un délice pour les sens. Vous pourrez déguster une variété de plats marocains authentiques, tels que le couscous, le tajine, le méchoui (agneau rôti) et bien sûr, savourer un thé à la menthe dans l'un des nombreux cafés de la ville. Les marchés locaux sont également un endroit idéal pour goûter des produits frais, des épices exotiques et des spécialités locales.
              </li>
            </ul>
            <ul>
              <li>
                <span>Les loisirs en plein air :</span> La région d'Agadir offre de nombreuses opportunités pour les activités en plein air. Vous pouvez explorer les montagnes de l'Anti-Atlas, faire de la randonnée dans le parc national du Souss-Massa, ou encore faire du quad dans le désert environnant. La région est également réputée pour ses terrains de golf de classe mondiale.
              </li>
            </ul>
            <ul>
              <li>
                <span>L'accueil chaleureux :</span> Les habitants d'Agadir sont connus pour leur hospitalité et leur convivialité. Vous serez accueilli à bras ouverts par les locaux, qui seront ravis de partager leur culture et de vous faire découvrir les trésors de leur ville. Agadir est une destination de rêve pour les voyageurs en quête de soleil, de plage, de culture et d'aventure. Que vous souhaitiez vous détendre sur le sable, explorer la région environnante ou découvrir la richesse culturelle du Maroc, Agadir a tout pour vous séduire.
              </li>
            </ul>
          </div>
        </div>
        <Map center={[30.400451,-9.579330]} zoom={12} width={900} height={600} className='agadir-map'>

</Map>

      </div>
      
    </div>
  );
};

export default AgadirDescription;
