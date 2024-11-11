import React, { useEffect, useState } from "react";

function Header() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    // Update the current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header style={styles.header}>
            <h1 style={styles.heading}>Parking Slot Status</h1>
            <div style={styles.time}>{currentTime}</div>
        </header>
    );
}

const styles = {
    header: {
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1B263B',
        color: 'white',
        zIndex: 1,
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
    },
    time: {
        fontSize: '1.5rem',
        fontWeight: '300',
        margin: '5px'
    },
};

export default Header;
