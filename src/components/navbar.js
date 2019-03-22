import React from "react"
import { Link } from "gatsby"
import Container from "./container.js"
import Logo from "./fekio.logo.svg"

const menuData = [
    { title: 'Products', link: '/products/' },
    { title: 'Blog', link: '/blog/' },
    { title: 'About', link: '/about/' },
    { title: 'Contact', link: '/contact/' }
];

const MenuItem = props => (
    <li style={{ display: 'inline' }}>
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
                        <li style={{ display: 'inline', paddingRight: '10px' }}>
                            <Link to="/"><img src={Logo} alt="Logo" style={{height: '22px', verticalAlign: 'top' }} /></Link> 
                        </li>
                        {menuData.map(item => ( <MenuItem key={item.title} title={item.title} link={item.link} /> ))}
                    </ul>
                </Container>
            </nav>)
}
