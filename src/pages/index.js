import React from "react"
import Layout from "../components/layout"
import Navbar from "../components/navbar.js"
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Article from "../components/article.js"
import MainHelmet from "../components/mainhelmet.js"
import iPhone from "../images/Template-App-iPhoneX.png"
import Android from "../images/android.png"
import NodeJS from "../images/500px-Node.js_logo.png"

const gridAreas = "'iosshowcase iosdesc iosdesc' 'androiddesc androiddesc androidshowcase' 'nodeshowcase nodedesc nodedesc'";

export default () => {
    return (
        <Layout>
            <MainHelmet title="Fek.io" />
            <Navbar />
            <Header headline="Welcome to FEK.IO" />
            <Article>
                <div style={{ display: 'block'}}>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>Mobile Software for your iPhone, iPad and Android devices. We also produce web services that can be consumed by these devices.</p>    
                    <div style={{ display: 'grid', 
                                    gridTemplateColumns: '1fr 1fr 1fr', 
                                    gridAutoRows: 'minmax(100px, auto)',
                                    gridTemplateAreas: gridAreas,
                                    gridGap: '20px' }}>
                        <div style={{ gridArea: 'iosshowcase', textAlign: 'center' }}>
                            <img src={iPhone} alt="iPhone" style={{ padding: '1rem' }} />
                        </div>
                        <div style={{ gridArea: 'iosdesc', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '2.5rem' }}>iOS Apps iPhone, </h3>
                            <h4 style={{ fontSize: '2.3rem' }}>iPad and Apple Watch development</h4>
                            <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
                        </div>
                        <div style={{ gridArea: 'androidshowcase', textAlign: 'center' }}>
                            <img src={Android} alt="android" style={{ padding: '1rem' }} />
                        </div>
                        <div style={{ gridArea: 'androiddesc', textAlign: 'center'  }}>
                            <h3 style={{ fontSize: '2.5rem' }}>Android Development</h3>
                            <h4 style={{ fontSize: '2.3rem' }}>The rest of the 92% of devices</h4>
                            <p style={{ fontSize: '2rem' }}>Learn about our iOS projects leveraging key aspects of the iOS SDK.</p>
                        </div>
                        <div style={{ gridArea: 'nodeshowcase', textAlign: 'center' }}>
                            <img src={NodeJS} alt="NodeJS" style={{ padding: '1rem' }} />
                        </div>
                        <div style={{ gridArea: 'nodedesc', textAlign: 'center'  }}>
                            <h3 style={{ fontSize: '2.5rem' }}>.NET and Node.js</h3>
                            <h4 style={{ fontSize: '2.3rem' }}> Will Seal the Deal.</h4>
                            <p>Mobile and IoT devices need a way to speak to the Cloud. We have 20 years of experience building server applications for your cloud solutions.</p>
                        </div>
                    </div>
                </div>
            </Article>
            <Footer />
        </Layout>
    )
}

/*
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 3;
    grid-template-areas: 
      "iosshowcase iosdesc iosdesc"
      "androiddesc androiddesc androidshowcase"
      "nodeshowcase nodedesc nodedesc";
 */