import React from "react"
import shareStyles from "./share.module.css"
import { FaTwitter, FaFacebook, FaRedditAlien, FaLinkedin } from 'react-icons/fa';
import {
	FacebookShareButton,
    LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton,
} from 'react-share';

// 	FaLinkedin,  LinkedinShareButton,

const Share = ({ socialConfig }) => (
    <div className={shareStyles.postSocial}>
        <TwitterShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.twitter}` } title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')}>
            <span className="icon" style={{ padding: '5px' }}>
                <FaTwitter size={16} style={{ margin: '0px' }} />
            </span>
            <span className="text" style={{ padding: '3px' }}>Twitter</span>
        </TwitterShareButton>
        <FacebookShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.facebook}` }  >
            <span className="icon" style={{ padding: '5px' }}>
                <FaFacebook size={16} style={{ padding: '0px' }} />
            </span>
            <span className="text" style={{ padding: '3px' }}>Facebook</span>
        </FacebookShareButton>
        <LinkedinShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.linkedin}` }  title={socialConfig.config.title} >
            <span className="icon" style={{ padding: '5px' }}>
                <FaLinkedin size={16} style={{ padding: '0px' }} />
            </span>
            <span className="text">LinkedIn</span>
        </LinkedinShareButton>
        <RedditShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.reddit}` }  title={socialConfig.config.title} >
            <span className="icon" style={{ padding: '5px' }}>
                <FaRedditAlien size={16} style={{ padding: '0px' }} />
            </span>
            <span className="text" style={{ padding: '3px' }}>Reddit</span>
        </RedditShareButton>
    </div>
);

export default Share;
