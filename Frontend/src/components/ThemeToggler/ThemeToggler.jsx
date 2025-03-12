import {useContext} from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import './ThemeToggler.css'


const ThemeToggler = () => {
  const {theme, changeTheme} = useContext(ThemeContext)
  return (
    <button 
      className={`theme-toggler ${theme}`}
      onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? 'Dark' : 'Light'} Mode 
    </button>
  )
}

export default ThemeToggler;