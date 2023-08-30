import React, { useState } from 'react';
import ReactSwitch from 'react-switch'
import '../assets/ModeSwitch.css';

const ModeSwitch = () => {
    // const [darkMode, setDarkMode] = useState("")
    // const [lightMode, setLightMode] = useState("light")
    const [mode, setMode] = useState('light')

    const changeMode = () => {
        setMode((current) => (current === 'light' ? 'dark': 'light'))
    }

    return (
        <>
            <div className={mode}>
                <div className="switch">
                <ReactSwitch 
                    onChange={changeMode} 
                    checked={mode === 'dark'}
                    uncheckedIcon={false}
                    checkedIcon={false}/>
                </div>
            </div>
        </>
    )
}

export default ModeSwitch;