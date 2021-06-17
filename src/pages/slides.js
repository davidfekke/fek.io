// relativeDirectory

import React from "react"
import { Link, graphql } from "gatsby" 
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/contactheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"

const Slides = ({ data }) => (
    <Layout>
        <MainHelmet title="Fek.io" />
        <Navbar />
        <Header headline="About FEK.IO" />
        <Article>
        <div>
            <h1>Slides</h1>
            <p>Here are copies of my slides from my presentations.</p>
            {data.myslides.edges.map( ({node}) => {
                const link_path = `/${node.relativePath}`;
                return (<div key={node.name}>
                        <a href={link_path}>{node.name}</a>
                    </div>)
                })
            }
        </div>
        </Article>
        <Footer />
    </Layout>
)

export const query = graphql`{
    myslides: allFile(filter: { relativeDirectory: {eq: "slides" }}) {
      edges {
        node {
          name
          relativePath
        }
      }
    }
}`;

export default Slides;
