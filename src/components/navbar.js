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


// style={{ display: 'inline-block' }}

const MenuItem = props => (
    <li className={ styles.navbar }> 
        <Link style={{ padding: '0.8rem', 
            textDecoration: 'none',
            color: 'black',
            textTransform: 'uppercase',
            fontWeight: 'bold' }} to={props.link}>{props.title}</Link>
    </li>
)

export default () => {
    return (<nav>
                <Container>
                    <ul style={{ display: 'block', 
                                listStyle: 'none',
                                padding: '0px' }}>
                        <li className={styles.navbarlogo}> 
                            <Link to="/"><img src={Logo} alt="Logo" style={{height: '22px', verticalAlign: 'top' }} /></Link> 
                        </li>
                        {menuData.map(item => ( <MenuItem key={item.title} title={item.title} link={item.link} /> ))}
                    </ul>
                </Container>
            </nav>)
}

/*
Logo style
{* style={{ display: 'inline', paddingRight: '10px' }} *}
*/