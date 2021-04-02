import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import * as homeStyles from "./home.module.css"

const Home = () => (
    <StaticQuery
      query={graphql`{
  ios: file(relativePath: {eq: "images/Template-App-iPhoneX.png"}) {
    relativePath
    childImageSharp {
      gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
    }
  }
  nodejs: file(relativePath: {eq: "images/500px-Node.js_logo.png"}) {
    relativePath
    childImageSharp {
      gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
    }
  }
  android: file(relativePath: {eq: "images/android.png"}) {
    relativePath
    childImageSharp {
      gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
    }
  }
}
`}
      render={data => (
        <div className={homeStyles.gridarea} >
            <div style={{ gridArea: 'iosshowcase', textAlign: 'center', marginBottom: '3rem' }}>
                <GatsbyImage
                    image={data.ios.childImageSharp.gatsbyImageData}
                    alt="iPhone"
                    style={{ padding: '1rem' }} 
                    format="WebP" />       
            </div>
            <div style={{ gridArea: 'iosdesc', textAlign: 'center', marginBottom: '3rem', alignItems: 'center' }}>
                
                <h3 style={{ fontSize: '2.5rem' }}>iOS Apps iPhone, iPad and Apple Watch development</h3>
                
                <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
                
            </div>
            <div style={{ gridArea: 'androidshowcase', textAlign: 'center', marginBottom: '3rem' }}>
                <GatsbyImage
                    image={data.android.childImageSharp.gatsbyImageData}
                    alt="android"
                    style={{ padding: '1rem' }}
                    format="WebP" /> 
            </div>
            <div style={{ gridArea: 'androiddesc', textAlign: 'center', marginBottom: '3rem'  }}>
                <h3 style={{ fontSize: '2.5rem' }}>Android Development,<br /> The rest of the 92% of devices</h3>
                <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
            </div>
            <div style={{ gridArea: 'nodeshowcase', textAlign: 'center' }}>
            <GatsbyImage
                image={data.nodejs.childImageSharp.gatsbyImageData}
                alt="nodejs"
                style={{ padding: '1rem' }}
                format="WebP" /> 
            </div>
            <div style={{ gridArea: 'nodedesc', textAlign: 'center'  }}>
                <h3 style={{ fontSize: '2.5rem' }}>.NET and Node.js</h3>
                
                <p style={{ fontSize: '2rem' }}>Mobile and IoT devices need a way to speak to the Cloud. We have 20 years of experience building server applications for your cloud solutions.</p>
            </div>
        </div>
      )}
    />
  )

  export default Home;
  