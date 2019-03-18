import React from "react"
import { Link } from "gatsby"
import Container from "./container.js"

const menuData = [
    { title: 'Home', link: '/' },
    { title: 'Products', link: '/products/' },
    { title: 'Blog', link: '/blog/' },
    { title: 'About', link: '/about/' },
    { title: 'Contact', link: '/contact/' }
];

const MenuItem = props => (
    <li style={{ display: 'inline' }}>
        <Link style={{ padding: '0.8rem', textDecoration: 'none' }} to={props.link}>{props.title}</Link>
    </li>
)

export default () => {
    return (<nav>
                <Container>
                    <ul style={{ display: 'block', 
                                listStyle: 'none',
                                padding: '0px' }}>
                        {menuData.map(item => ( <MenuItem title={item.title} link={item.link} /> ))}
                    </ul>
                </Container>
            </nav>)
}
