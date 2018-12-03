import React from 'react';

const styles = {
    feedbackAndVersionDiv: {
        textAlign: 'center'
    }
};

const Footer = () => (
    <div>
        <br />
        <br />
        Look out for these upcomming features:
        <ul>
            <li>Role Based Access</li>
            <li>Draft/Publish Assets </li>
            <li>Single Sign On Integration</li>
        </ul>
        <div style={styles.feedbackAndVersionDiv}>
            <a href="mailto:portal_feedback@cloudsolutionhubs.com?subject=Asset%20Portal%20Feedback&body=Please%20tell%20us%20about%20your%20experience%20using%20the%20portal:">
                Have some feedback? We'd love to hear it
            </a>
            <br />
            Release version 1.0
            <br />
        </div>
    </div>
)

export default Footer;