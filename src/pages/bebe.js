import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import { GatsbyImage } from "gatsby-plugin-image";


const Bebe = ({data}) => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Ms Bebe Albano" />
            <Article>
                <h2>This is my cat Bebe</h2>
                <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt="My cat" />
            </Article>
            <Footer />
        </Layout>
    );
}

export const query = graphql`{
  file(relativePath: {eq: "images/bebealbano.jpg"}) {
    id
    extension
    relativePath
    dir
    childImageSharp {
      gatsbyImageData(quality: 75, layout: FULL_WIDTH)
    }
  }
}
`

export default Bebe;
