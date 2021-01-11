
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = () => {
 

    return  <div className="nav-bar">
          <Link
            to={'/'}
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            <img src={logo}  style={{ display: 'flex', justifyContent: 'center' , width: 200, height: 40, marginLeft: 50}}/>
          </Link>
          <ul style={{ flex: 8}}>
            {/* Menu options */}
          </ul>
    </div>

}

export { Header };
 