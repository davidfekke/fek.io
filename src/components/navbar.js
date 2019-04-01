import React from "react"
import { Link } from "gatsby"
import Container from "./container.js"
import Logo from "./fekio.logo.svg"
import styles from "./navbar.module.css"

const menuData = [
    { title: 'Products', link: '/products/' },
    { title: 'Blog', link: '/blog/' },
    { title: 'About', link: '/about/' },
    { title: 'Contact', link: '/contact/' }
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
        //this.state.logoHeight = '22px';
        this.state = {
            logoHeight: '40px'
        };
        
        this.handleScroll = this.handleScroll.bind(this);
        //this.logoImg = React.createRef();
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

    render() {
        return (<nav className={styles.mainNavElement}>
            <Container>
                <ul style={{ display: 'block', 
                            listStyle: 'none',
                            padding: '0px' }}>
                    <li className={styles.navbarlogo}> 
                        <Link to="/"><img src={Logo} alt="Logo" style={{ height: `${this.state.logoHeight}` }} /></Link>
                    </li>
                    {menuData.map(item => ( <MenuItem key={item.title} title={item.title} link={item.link} /> ))}
                </ul>
            </Container>
        </nav>)
    }
}

export default Navbar;
