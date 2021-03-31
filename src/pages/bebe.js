import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import Img from "gatsby-image"


const Bebe = ({data}) => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Ms Bebe Albano" />
            <Article>
                <h2>This is my cat Bebe</h2>
                <Img fluid={data.file.childImageSharp.fluid} alt="My cat" />
            </Article>
            <Footer />
        </Layout>
    )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "images/bebealbano.jpg" }) {
      id
      extension
      relativePath
      dir
      childImageSharp {
        fluid(maxWidth: 1160, quality: 75) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Bebe;
