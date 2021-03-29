import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import * as homeStyles from "./home.module.css"

export default () => (
    <StaticQuery
      query={graphql`
        query {
            ios: file(relativePath: { eq: "images/Template-App-iPhoneX.png" }) {
            relativePath
            childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            nodejs: file(relativePath: { eq: "images/500px-Node.js_logo.png" }) {
            relativePath
            childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyImageSharpFluid      
                }
              }
            }
            android: file(relativePath: { eq: "images/android.png" }) {
            relativePath
            childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
        }
      `}
      render={data => (
        <div className={homeStyles.gridarea} >
            <div style={{ gridArea: 'iosshowcase', textAlign: 'center', marginBottom: '3rem' }}>
                <Img fluid={data.ios.childImageSharp.fluid} alt="iPhone" style={{ padding: '1rem' }} />       
            </div>
            <div style={{ gridArea: 'iosdesc', textAlign: 'center', marginBottom: '3rem', alignItems: 'center' }}>
                
                <h3 style={{ fontSize: '2.5rem' }}>iOS Apps iPhone, iPad and Apple Watch development</h3>
                
                <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
                
            </div>
            <div style={{ gridArea: 'androidshowcase', textAlign: 'center', marginBottom: '3rem' }}>
                <Img fluid={data.android.childImageSharp.fluid} alt="android" style={{ padding: '1rem' }} /> 
            </div>
            <div style={{ gridArea: 'androiddesc', textAlign: 'center', marginBottom: '3rem'  }}>
                <h3 style={{ fontSize: '2.5rem' }}>Android Development,<br /> The rest of the 92% of devices</h3>
                <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
            </div>
            <div style={{ gridArea: 'nodeshowcase', textAlign: 'center' }}>
            <Img fluid={data.nodejs.childImageSharp.fluid} alt="nodejs" style={{ padding: '1rem' }} /> 
            </div>
            <div style={{ gridArea: 'nodedesc', textAlign: 'center'  }}>
                <h3 style={{ fontSize: '2.5rem' }}>.NET and Node.js</h3>
                
                <p style={{ fontSize: '2rem' }}>Mobile and IoT devices need a way to speak to the Cloud. We have 20 years of experience building server applications for your cloud solutions.</p>
            </div>
        </div>
      )}
    />
  )