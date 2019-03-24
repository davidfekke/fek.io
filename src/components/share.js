import React from "react"
import shareStyles from "./share.module.css"
import { FaTwitter, FaFacebook, FaRedditAlien } from 'react-icons/fa';
import {
	FacebookShareButton,

	TwitterShareButton,
	RedditShareButton,
} from 'react-share';

// 	FaLinkedin,  LinkedinShareButton,

const Share = ({ socialConfig }) => (
    <div className={shareStyles.postSocial}>
        <TwitterShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.twitter}` } title={socialConfig.config.title} via={socialConfig.twitterHandle.split('@').join('')}>
            <span className="icon">
                <FaTwitter size={32} style={{ padding: '5px' }} />
            </span>
            <span className="text">Twitter</span>
        </TwitterShareButton>
        <FacebookShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.facebook}` }  >
            <span className="icon">
                <FaFacebook size={32} style={{ padding: '5px' }} />
            </span>
            <span className="text">Facebook</span>
        </FacebookShareButton>
        {/* <LinkedinShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.linkedin}` }  title={socialConfig.config.title} >
            <span className="icon">
                <FaLinkedin size={32} style={{ padding: '5px' }} />
            </span>
            <span className="text">LinkedIn</span>
        </LinkedinShareButton> */}
        <RedditShareButton url={socialConfig.config.url} className={ `button is-outlined is-rounded ${shareStyles.reddit}` }  title={socialConfig.config.title} >
            <span className="icon">
                <FaRedditAlien size={32} style={{ padding: '5px' }} />
            </span>
            <span className="text">Reddit</span>
        </RedditShareButton>
    </div>
);

export default Share;
