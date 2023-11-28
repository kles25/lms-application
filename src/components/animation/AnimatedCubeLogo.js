import React, { useEffect, useState } from 'react';
import "./animate.css"

function AnimateCubeLogo() {
    const [currentClass, setCurrentClass] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const cube = document.querySelector('.cube');
            const sides = ['show-front', 'show-back', 'show-left', 'show-right', 'show-top', 'show-bottom'];
            const randomIndex = Math.floor(Math.random() * sides.length);
            const showClass = sides[randomIndex];

            if (currentClass) {
                cube.classList.remove(currentClass);
            }
            cube.classList.add(showClass);
            setCurrentClass(showClass);
        }, 3000); // Change rotation time here (in milliseconds)

        return () => clearInterval(interval);
    }, [currentClass]);

    return (
        <div className="scene2">
            <div className="cube2">
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
