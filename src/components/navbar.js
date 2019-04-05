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

        let startingWidth = '1160px';
        if (typeof window !== 'undefined') {
            startingWidth = window.innerWidth + 'px';
        }

        this.state = {
            logoHeight: '40px',
            hamburgerTop: '11px',
            windowwidth: startingWidth
        };
        
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    
    handleScroll(event) {
        if (document.documentElement.scrollTop > 80) {
            this.setState({ 
                logoHeight: '22px',
                hamburgerTop: '6px'
             });
        } else {
            this.setState({ 
                logoHeight: '40px',
                hamburgerTop: '11px'
            });
        }
    }

    handleResize(event) {
        const width = event.target.innerWidth;
        this.setState({ windowwidth: width + 'px' });
        let linksEl = document.querySelector('nav');
        if (width > 768 && linksEl.style.display === 'none') {
            linksEl.style.display = 'block';
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.handleScroll, false);
            window.removeEventListener('resize', this.handleResize, false);
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
                <div className={styles.hamburger} style={{ top: `${this.state.hamburgerTop}`}}>
                    <FaBars size={32}  style={{ padding: '5px' }} onClick={this.burgerToggle} />
                </div>          
            </Container>
        </div>)
    }
}

export default Navbar;
