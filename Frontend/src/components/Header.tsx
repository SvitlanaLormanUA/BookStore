import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../styles/App.css';

export default function Header() {
    return (
        <div className="header-container">
            <ul className="params">
                <Tabs className="menuParam mb-3" defaultActiveKey="shop" id="fill-tab-example" fill>
                <Tab eventKey="team" title={<Link to="/main" className="nav-link">Main Page</Link>}>
                </Tab>
                    <Tab eventKey="shop" title={<Link to="/shop" className="nav-link">Shop</Link>}>
                    </Tab>
                    <Tab eventKey="blog" title={<Link to="/blog" className="nav-link">Blog</Link>}>
                    </Tab>
                    <Tab eventKey="about" title={<Link to="/about" className="nav-link">About us</Link>}>
                    </Tab>
               
                </Tabs>
                <div className="buttons-login">
                        <Button className="custom-login-btn">Login</Button>
                        <Button className="custom-register-btn">Sign Up</Button>
                </div>

            </ul>
        </div>
    );
}
