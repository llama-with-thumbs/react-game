import React from 'react';
import { ReactComponent as GitLogo } from '../../assets/github.svg';
import { ReactComponent as RSSchoolLogo } from '../../assets/rs_school_js.svg';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube.svg';

import './footer.styles.scss';

const Footer = () => (
    <footer className='footer'>
        <div className='year'>2021</div>
        <div className='links'>
            <a className='resource' href='https://www.youtube.com/'>
                <YoutubeLogo className='logo' />Youtube video
            </a>
            <a className='resource' href='https://community-z.com/events/react-rsschool-2021'>
                <RSSchoolLogo className='logo' />RSS React 2021 Q1
            </a>
            <a className='resource' href='https://github.com/llama-with-thumbs'>
                <GitLogo className='logo' />llama-with-thambs
            </a>
        </div>
    </footer>
)

export default Footer;