import './Header.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
<>
<div className="Header">
  <div className='container header-info'>
    <div className='logo'>
      <Link to="/" className= 'logo-link'>CredoHouse</Link>
      </div>
     <nav className='header-nav'>
    <ul className='d-flex nav-list'>
      <li><Link to="/" className ='item-link'>Home</Link></li>
      <li><Link to="/" className ='item-link'>Admin</Link></li>
      <li><Link to="/" className ='item-link' >+998990866422</Link></li>
    </ul>
    </nav>
    </div>
  </div>
</>
  );
}

export default Header;