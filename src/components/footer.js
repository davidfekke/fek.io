import React from "react"
import Container from "./container.js"
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

export default () => {
    return (
        <footer style={{ backgroundColor: '#868e96', marginTop: '2rem'}}>
            <Container>
                <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                    <div style={{ textAlign: 'center', height: '3rem', paddingTop: '20px', paddingBottom: '20px',  }}>
                        <a href="https://twitter.com/davidfekke" target="_blank" style={{ textDecoration: 'none', color: 'black' }}><FaTwitter size={32} style={{ padding: '5px' }} /></a>
                        <a href="https://www.facebook.com/David-Fekke-LLC-178889285498948/" target="_blank" style={{ textDecoration: 'none', color: 'black' }}><FaFacebook size={32}  style={{ padding: '5px' }} /> </a>
                        <a href="https://www.linkedin.com/in/david-fekke-1913ba2/" target="_blank" style={{ textDecoration: 'none', color: 'black' }}><FaLinkedin size={32}  style={{ padding: '5px' }} /></a> 
                        <a href="https://github.com/davidfekke/" target="_blank" style={{ textDecoration: 'none', color: 'black' }}><FaGithub size={32}  style={{ padding: '5px' }} /></a>
                    </div>
                    <div style={{ textAlign: 'center'}}>
                        Copyright 2019, David Fekke.
                    </div>
                </div>
            </Container>
        </footer>
    )
}
