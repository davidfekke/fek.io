import React from "react"
import Container from "./container.js"
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

export default () => {
    return (
        <footer style={{ backgroundColor: '#868e96'}}>
            <Container>
                <div style={{ textAlign: 'center', height: '3rem', paddingTop: '20px', paddingBottom: '20px' }}>
                    <FaTwitter size={32} />
                    <FaFacebook size={32}  /> 
                    <FaLinkedin size={32}  /> 
                    <FaGithub size={32}  />
                </div>
                <div style={{ textAlign: 'center'}}>
                    Copyright 2019, David Fekke.
                </div>
            </Container>
        </footer>
    )
}