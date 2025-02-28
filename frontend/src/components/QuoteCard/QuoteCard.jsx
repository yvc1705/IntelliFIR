import React from "react";
import "./QuoteCard.css";

const QuoteCard = () => {
    return (
        <div className="glass-container">
            <p className="quote">
                <em>“Injustice anywhere is a threat to justice everywhere.”</em>
            </p>
            <p className="author">— Martin Luther King Jr.</p>
        </div>
    );
};

export default QuoteCard;
