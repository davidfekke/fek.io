import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/contactheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Contact Us" />
            <Article>
                <div>
                    <h1>How to contact</h1>
                    <p>
                    The best way to get a hold of me is by filling out the following contact form:</p>

                    <form name="contact" method="POST" action="/contactsuccess/" data-netlify-recaptcha="true" data-netlify="true">
                        
                        <label for="firstname">First Name: </label>
                        <input type="text" name="firstname" />
                    
                
                        <label  for="lastname">Last Name: </label>
                        <input type="text" name="lastname" />
                    
                    
                        <label for="email">Email: </label>
                        <input type="text" name="email" />
                    
                    
                        <label for="phone">Phone: </label>
                        <input type="text" name="phone" />
                    
                    
                        <label for="message">Message: </label>
                        <textarea rows="7" name="message"></textarea>
                        
                        <div data-netlify-recaptcha="true"></div>
                        
                        <button style={{ backgroundColor: 'lightblue' }}  type="submit">Send</button>
                        
                    </form>
                    
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440729.5231172946!2d-81.9639752016373!3d30.345282490679985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sJacksonville%2C+FL!5e0!3m2!1sen!2sus!4v1553701891837" title="Map of Jacksonville, Fl" width="100%" height="450" frameborder="0" style={{ border: '0' }} allowfullscreen></iframe>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}
