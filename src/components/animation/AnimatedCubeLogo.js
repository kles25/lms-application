import React, { useEffect, useState } from 'react';
import "./animate.css"

function AnimateCubeLogo() {
    const sides = ['show-front', 'show-back', 'show-left', 'show-right', 'show-top', 'show-bottom'];
    const [currentClass, setCurrentClass] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * sides.length);
            const showClass = sides[randomIndex];
            setCurrentClass(showClass);
        }, 3000); // Change rotation time here (in milliseconds)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="scene2">
            <div className={`cube2 ${currentClass}`}>
                <div className="cube__face2 cube__face--front2"></div>
                <div className="cube__face2 cube__face--back2"></div>
                <div className="cube__face2 cube__face--right2"></div>
                <div className="cube__face2 cube__face--left2"></div>
                <div className="cube__face2 cube__face--top2"></div>
                <div className="cube__face2 cube__face--bottom2"></div>
            </div>
        </div>
    );
}

export default AnimateCubeLogo;
