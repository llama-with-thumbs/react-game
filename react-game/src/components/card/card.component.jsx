import React, { useState} from 'react';
import './card.style.scss';

const Card = (props) => {
    const [cardStatus, switchStatus] = useState(props.card[1]);
    // console.log(props);
    const flip = () => {
        props.startTimer();
        switchStatus( cardStatus => !cardStatus);
    }
    return (
        <div className="emoji-card" id="emoji-card">
            <div className={`emoji-card__frame ${cardStatus ? `flipped` : null}`} onClick={flip} id="emoji-card__frame">
                <div className="emoji-card__face" id="emoji-card__face">{props.card}</div>
                <div className="emoji-card__back" id="emoji-card__back"></div>
            </div>
        </div>
    )
};

export default Card;
