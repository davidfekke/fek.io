import React from "react"
import Container from "./container.js"
import { Link } from "gatsby"
import ExtLink from "./extlink"
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import footerStyles from "./footer.module.css"

export default () => {
    return (
        <footer style={{ backgroundColor: '#868e96', marginTop: '2rem'}}>
            <Container>
                <div style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
                    <div style={{ textAlign: 'center', height: '3rem', paddingTop: '20px', paddingBottom: '10px',  }}>
                        <a href="https://twitter.com/davidfekke" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black' }}><FaTwitter size={32} style={{ padding: '5px' }} /></a>
                        <a href="https://www.facebook.com/David-Fekke-LLC-178889285498948/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black' }}><FaFacebook size={32}  style={{ padding: '5px' }} /> </a>
                        <a href="https://www.linkedin.com/in/david-fekke-1913ba2/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black' }}><FaLinkedin size={32}  style={{ padding: '5px' }} /></a> 
                        <a href="https://github.com/davidfekke/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black' }}><FaGithub size={32}  style={{ padding: '5px' }} /></a>
                        <a href="https://www.youtube.com/davidfekke/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'black' }}><FaYoutube size={32}  style={{ padding: '5px' }} /></a>
                    </div>
                    <nav className={footerStyles.gridarea}>
                        <div>
                            <ul>
                                <li>
                                    <strong>Connect</strong>
                                </li>
                                <li>
                                    <Link to="blog">Blog</Link>
                                </li>
                                <li>
                                    <ExtLink uri="https://twitter.com/davidfekke" name="Twitter" />
                                </li>
                                <li>
                                    <ExtLink uri="https://www.linkedin.com/in/david-fekke-1913ba2/" name="Linkedin" />
                                </li>
                                <li>
                                    <ExtLink uri="https://www.youtube.com/davidfekke/" name="Youtube" />    
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <strong>Products</strong>
                                </li>
                                <li>
                                    <Link to="/products/idogyears">iDogYears</Link>
                                </li>
                                <li>
                                    <Link to="/products/ilottonum">iLottoNum</Link>
                                </li>
                                <li>
                                    <Link to="/products/icatyears">iCatYears</Link>
                                </li>
                                <li>
                                    <Link to="/products/jaxnode">JaxNode App</Link>
                                </li>
                            </ul>                            
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <strong>Sites</strong>
                                </li>
                                <li>
                                    <ExtLink uri="https://www.jaxtechmeetups.com" name="Jax Tech Meetups" />
                                </li>
                                <li>
                                    <ExtLink uri="https://www.jaxnode.com" name="JaxNode" />
                                </li>
                                <li>
                                    <ExtLink uri="https://www.swyftmobile.com" name="Swyft Mobile" />
                                </li>
                                <li>
                                    <ExtLink uri="https://www.github.com/davidfekke" name="Github" />
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <strong>Pages</strong>
                                </li>
                                <li>
                                    <Link to={`contact`}>Contact</Link>
                                </li>
                                <li>
                                    <Link to={`about`}>About</Link>
                                </li>
                                <li>
                                    <Link to={`terms`}>Terms and Conditions</Link>
                                </li>
                                <li>
                                    <a href="/rss.xml">RSS Feed</a>
                                </li>
                            </ul>
                        </div>    
                    </nav>
                    <div style={{ textAlign: 'center', fontSize: 'small', paddingTop: '1rem'}}>
                        <p style={{ fontWeight: '600' }}>Copyright 2020, David Fekke</p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
