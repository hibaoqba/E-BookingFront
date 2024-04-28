import { init } from 'echarts';
import React, { useEffect, useState } from 'react';

const CountUpAnimation = ({ iconComponent, initialValue, targetValue, text , className}) => {
    const [count, setCount] = useState(initialValue);
    const duration = 1000;

    useEffect(() => {
        let startValue = initialValue;
        const interval = Math.floor(duration / (targetValue - initialValue));

        const counter = setInterval(() => {
            startValue += 1;
            setCount(startValue);
            if (startValue >= targetValue) {
                clearInterval(counter);
            }
        }, interval);

        return () => {
            clearInterval(counter);
        };
    }, [targetValue, initialValue]);

    return (
        <div className={className} >
            <div className="countup-icon">{iconComponent}</div>
            <span className="num">{count}</span>
            <span className="text">{text}</span>
        </div>
    );
};

export default CountUpAnimation;
