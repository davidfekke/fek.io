import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/aboutheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import ExtLink from "../components/extlink.js"
//import Img from "gatsby-image"


const About = ({data}) => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="About FEK.IO" />
            <Article>
                <div className="aboutDiv" >
                    <h2>Need a iOS, Android or Node.js application</h2>
                    <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt="Me" style={{ float: 'left', boxShadow: '2px 2px 5px black', width: '7rem', height: '7rem', borderRadius: '50%', border:'1px solid orange', margin: '0.5rem' }}  />
                    {/* <Img fixed={data.file.childImageSharp.fixed} alt="Me" style={{ float: 'left', boxShadow: '2px 2px 5px black', width: '7rem', borderRadius: '50%', border:'1px solid orange', margin: '0.5rem' }} /> */}
    {/* <img src={photoOfMe} alt="David Fekke" style={{ float: 'left', boxShadow: '2px 2px 5px black', width: '7rem', borderRadius: '50%', border:'1px solid orange', margin: '0.5rem' }} /> */}
                    <p>This is the web site for David Fekke's mobile applications. David is a iOS, Android and Node.js developer. He also develops .NET, ColdFusion and Java web applications.</p>

                <p>If you are looking for David's Powerpoint and presentation slides, you find them at this <Link to="/slides">Link</Link>.</p>

                <p>If you are interested in custom application development, please contact me for rates.</p>
                <br />
                <p>
                  You can find a copy of my <Link to="/resume">Resume here</Link>.
                </p>
                <h3>Affiliations</h3>
                <ul>
                  <li>
                    <strong><ExtLink uri="https://www.jaxnode.com" name="JaxNode" /></strong>
                  </li>
                  <li>
                    <strong>JaxDUG</strong>
                  </li>
                  <li>
                    <strong>JaxWeb/JaxPHP</strong>
                  </li>
                  <li>
                  <strong><ExtLink uri="http://jaxmug.com" name="JaxMUG" /></strong>
                  </li>
                  <li>
                    <ExtLink uri="https://craigpilots.org" name="Criag Pilots Airport Association" />
                  </li>
                </ul>
                
                <h3>Jax Tech Meetups</h3>
                <p><ExtLink uri={`https://polyglotengineer.com`} name="Polyglot Engineer Channel" /> is a Youtube channel I created to show Software Engineers looking to learn a new language.</p>
                
                 <h3>Aviation</h3>
                <p>David is also a Commercial pilot and a licensed remote pilot in single engine and multi engine land aircraft (ASMEL).</p>

                <p>This Web site is built using Gatsby JS.</p>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "DavidFekke.jpg" }) {
      id
      extension
      relativePath
      dir
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
  }
`

export default About;
