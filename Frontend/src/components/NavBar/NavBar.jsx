import {useContext} from 'react'
import { assets } from '../../assets/assets';
import { ThemeContext } from '../../context/ThemeContext';
import "./Navbar.css";
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  const {theme, changeTheme} = useContext(ThemeContext)
  const {registered} = useContext(AuthContext);

  const {logOut} = useAuth();

  return (
    <header>
        <nav className={`${theme}`}>
            <h1>Tasker</h1>

            <div className="btns-container">
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
              {registered && <button className='log-out-btn' onClick={logOut}>
                  Log out
              </button>}
            </div>
        </nav>
    </header>
  )
}

export default NavBar