import React from "react"
import iPhone from "../images/Template-App-iPhoneX.png"
import Android from "../images/android.png"
import NodeJS from "../images/500px-Node.js_logo.png"
import homeStyles from "./home.module.css"

export default () => {
    return (
        <div className={homeStyles.gridarea} >
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
    );
}