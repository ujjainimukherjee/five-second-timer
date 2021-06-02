
import { useState, useRef, useEffect } from "react";
import './Timer.scss';

const Timer =
    ({baseDuration, reverseDuration}) => {
    const CIRCUMF = 251.33;
    // time units are in milliseconds
    const [timerState, setTimerState] = useState('INIT');
    const [timeLeft, setTimeLeft] = useState(5000);

    const [timerTransformClass, setTimerTransformClass] = useState('clockWiseTransform');
    const [remainingPathClass, setRemainingPathClass] = useState('gray');
    const [pathElapsedClass, setPathElapsedClass] = useState('strokeBlack');
    const [remainingPathTransitionClass, setRemainingPathTransitionClass] = useState('');

    let timerInterval = useRef(null);
    let timePassed = useRef(0);
    const pathRemaining = useRef(null);
    const pathElapsed = useRef(null);


    /**
     * coloring the timer in black takes 5 seconds
     */
    const startTimer = () => {
        setTimerState('RUNNING');
        timerInterval.current = setInterval(() => {
            timePassed.current += 1000;
            const timeLeft = baseDuration - timePassed.current;
            setTimeLeft(timeLeft);
            colorTimerCircle(timeLeft);
        }, 1000);
    }

    /**
     * reverse timer takes 300 miliseconds
     */
    const startReverseTimer = () => {
        setTimerState('REVERSE');
        setTimerTransformClass('antiClockWiseTransform');
        setRemainingPathTransitionClass('transition-anticlockwise');
        setPathElapsedClass('strokeGray')
        pathRemaining.current.removeAttribute("stroke-dasharray");
        timerInterval.current = setInterval(() => {
            timePassed.current += 1;
            const timeLeft = reverseDuration - timePassed.current;
            setTimeLeft(timeLeft);
            colorTimerCircle(timeLeft);
        }, 1);
    }

    /**
     * stop the timer
     */
    const stopTimer = () => {
        clearInterval(timerInterval.current)
    }


    /** set the initial state */
    const setInit = () => {
        setTimerTransformClass('clockWiseTransform');
        setPathElapsedClass('strokeBlack')
        pathRemaining.current.setAttribute('stroke-dasharray', '251.33, 251.33');
    }


    /** use dash-array to cover the circle */
    const colorTimerCircle = timeLeft => {
        let movement;
        if (timerState === 'STOPPED') {
            const movement = `${(
                (timeLeft / reverseDuration) * CIRCUMF
            ).toFixed(0)} 251.33`;
            pathRemaining.current.setAttribute("stroke-dasharray", movement);
            if (timeLeft === 0) {
                stopTimer();
                setRemainingPathClass('gray');
                setTimeLeft(0);
                setTimerState('INIT');
                timePassed.current = 0;
                setTimeout(() => {
                    setInit();
                }, 0)
            }

        } else { // for INIT and RUNNING states
            movement = `${(
                progress(timeLeft) * CIRCUMF
            ).toFixed(0)} 251.33`;
            pathRemaining.current.setAttribute("stroke-dasharray", movement);
            // adjust for last few seconds lag in coloring
            if (timeLeft <= 0.000001) {
                setRemainingPathClass('black');
            }
            if (timeLeft === 0) {
                setTimerState('STOPPED');
                stopTimer();
                timePassed.current = 0;
                setTimeLeft(0);
            }
        }
    }

    const progress = (timeLeft) => {
        return timeLeft / baseDuration - 0.2;
    }

    const handleClick = () => {
        switch (timerState) {
            case 'INIT':
                setRemainingPathTransitionClass('transition-clockwise');
                startTimer();
                break;
            case 'STOPPED':
                startReverseTimer();
                break;
            case 'RUNNING':
                clearInterval(timerInterval.current);
                setTimerState('PAUSED');
                break;
            case 'PAUSED':
                startTimer();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setRemainingPathClass('gray');
        return () => clearInterval(timerInterval.current);
    }, []);

    return (
        <div className="timer-wrapper" onClick={handleClick}>
            <svg id="timer_svg" className={`${timerTransformClass}`} viewBox="0 0 100 100">
                <g className="timer-group">
                    <circle ref={pathElapsed} className={`path-elapsed  ${pathElapsedClass}`} cx="50" cy="50" r="40" />
                    <path
                        strokeDasharray="251.33 251.33"
                        ref={pathRemaining}
                        className={`path-remaining ${remainingPathClass} ${remainingPathTransitionClass}`}
                        d="
                            M 10, 50
                            a 40,40 0 1,0 80,0
                            a 40,40 0 1,0 -80,0
                            "
                    ></path>
                </g>
            </svg>
            <div className="display-time">{timeLeft}</div>
        </div>
    )
}


export default Timer;