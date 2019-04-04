import React from "react"
import { Link } from "gatsby"
import Container from "./container.js"
import { FaBars } from 'react-icons/fa';
import Logo from "./fekio.logo.svg"
import styles from "./navbar.module.css"

const menuData = [
    { title: 'Products', link: 'products' },
    { title: 'Blog', link: 'blog' },
    { title: 'About', link: 'about' },
    { title: 'Contact', link: 'contact' }
];

const MenuItem = props => (
    <li className={ styles.navbar }> 
        <Link style={{ padding: '0.8rem', 
            textDecoration: 'none',
            color: 'black',
            textTransform: 'uppercase',
            fontWeight: 'bold' }} to={props.link}>{props.title}</Link>
    </li>
)

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logoHeight: '40px'
        };
        
        this.handleScroll = this.handleScroll.bind(this);
    }
    
    handleScroll(event) {
        if (document.documentElement.scrollTop > 80) {
            this.setState({ logoHeight: '22px' });
        } else {
            this.setState({ logoHeight: '40px' });
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll',this.handleScroll, false);
        }
    }
    
    burgerToggle() {
        let linksEl = document.querySelector('nav');
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }

    render() {
        return (<div className={styles.mainNavElement}>
            <Container>
                <div className={styles.navbarlogo}>
                    <Link to="/"><img src={Logo} alt="Logo" style={{ height: `${this.state.logoHeight}` }} /></Link>
                </div>
                <nav>
                    <ul style={{ display: 'block', 
                        float: 'left',
                        listStyle: 'none',
                        padding: '0px' }}>
                        {menuData.map(item => ( <MenuItem key={item.title} title={item.title} link={item.link} /> ))}
                    </ul>
                </nav>  
                <div className={styles.hamburger}>
                    <a href="#" onClick={this.burgerToggle}><FaBars size={32}  style={{ padding: '5px' }} /></a>
                </div>          
            </Container>
        </div>)
    }
}

export default Navbar;
