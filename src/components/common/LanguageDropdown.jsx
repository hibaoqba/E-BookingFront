import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
const LanguageDropdown = () => {
  return (
    <div>
       <Dropdown className='language-dropdown'>
            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className='toggle'>
              <img src="/src/assets/fr.png" alt="France Flag" className='flag'/> 
              Français
            </Dropdown.Toggle>
            <Dropdown.Menu className='language-menu'>
              <Dropdown.Item href="#/anglais">
                <img src="/src/assets/uk.png" alt="uk Flag" className='flag'/> 
                Anglais
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
    </div>
  )
}

export default LanguageDropdown
