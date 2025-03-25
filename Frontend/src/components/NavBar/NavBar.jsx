import {useContext} from 'react'
import { assets } from '../../assets/assets';
import { ThemeContext } from '../../context/ThemeContext';
import "./Navbar.css";

const NavBar = () => {
  const {theme, changeTheme} = useContext(ThemeContext)

  return (
    <header>
        <nav className={`${theme}`}>
            <h1>Tasker</h1>
            <button 
              className={`theme-toggler ${theme}`}
              onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}
              title = "Toggle Theme"
              >
                <img src = {assets.day_and_night} 
                  alt = "day and night"
                  className='theme-toggler-icon'
                />
            </button>
        </nav>
    </header>
  )
}

export default NavBar