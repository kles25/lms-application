import React, { useEffect, useState } from 'react';
import "./animate.css"

function AnimateCube() {
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
        <div className="scene">
            <div className="cube">
                <div className="cube__face cube__face--front"></div>
                <div className="cube__face cube__face--back"></div>
                <div className="cube__face cube__face--right"></div>
                <div className="cube__face cube__face--left"></div>
                <div className="cube__face cube__face--top"></div>
                <div className="cube__face cube__face--bottom"></div>
            </div>
        </div>
    );
}

export default AnimateCube;
