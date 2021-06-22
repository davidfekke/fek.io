import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/aboutheader.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import seo from "../components/seo"
import HeaderImage from "../components/b24-3x.jpg"

const sunnfun = ({data}) => {
    const site = data.site;
    const title = 'Sun-n-Fun 2021';

    const socialConfig = {
        twitterHandle: site.siteMetadata.twitterHandle,
        config: {
            url: 'https://fek.io/sunandfun2021',
            title,
            description: site.siteMetadata.description
        }
    };
    const seoData = {
        title,
        cover: HeaderImage,
        slug: 'https://fek.io/sunandfun2021',
        siteURL: socialConfig.config.url,
        twitterHandle: site.siteMetadata.twitterHandle,
        description: site.siteMetadata.description
    };
    const facebook = {
        appId: site.siteMetadata.facebookAppId
    };
    return (
        <Layout>
            <seo data={seoData} facebook={facebook} />
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Sun-n-Fun 2021" />
            <Article>
                <div>
                    <h1>Sun-n-Fun 2021</h1>
                    <p>Here are some pictures from Sun-n-Fun 2021</p>
                    {data.sunnfunimages.edges.map(({ node }) => { 
                        return (<div key={node.id}>
                            <GatsbyImage image={node.childImageSharp.gatsbyImageData} alt={node.id} />
                        </div>); 
                    })}
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

export const query = graphql`{
sunnfunimages: allFile(filter: {relativeDirectory: {eq: "images/sunnfun2021"}}) {
  edges {
    node {
        id
        childImageSharp {
          gatsbyImageData(quality: 75, layout: FULL_WIDTH, placeholder: DOMINANT_COLOR)
        }
      }
    }
  }
  site {
    siteMetadata {
        title
        description
        twitterHandle
        url
        facebookAppId
    }
  }
}`;

export default sunnfun;
