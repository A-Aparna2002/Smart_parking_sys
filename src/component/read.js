import React, { useEffect, useState } from "react";
import app from "../fireBaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { FaCar } from "react-icons/fa"; // Car icon
import { PiX } from "react-icons/pi";

function Read() {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    // Function to fetch slot data from Firebase
    const fetchData = async () => {
        setLoading(true);
        const db = getDatabase(app);
        const dbRef = ref(db, 'esp32-0DA710');
        
        try {
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const slotsData = [
                    data.ir_sen1,
                    data.ir_sen2,
                    data.ir_sen3,
                    data.ir_sen4
                ];
                setSlots(slotsData);
            } else {
                setError("No data available");
            }
        } catch (err) {
            console.error("Firebase fetch error:", err);
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    // Update the current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (loading) {
        return <div style={styles.loader}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>

            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.heading}>Parking Slot Status</h1>
                <div style={styles.time}>{currentTime}</div>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                <ul style={styles.slotContainer}>
                    {slots.length === 0 ? (
                        <li>No parking slot data available</li>
                    ) : (
                        slots.map((status, index) => (
                            <li
                                key={index}
                                style={{
                                    ...styles.slot,
                                    backgroundColor: status === 1 ? '#00A859' : '#D32F2F', // Green for available, Red for occupied
                                }}
                            >
                                <div style={styles.slotContent}>
                                    <FaCar style={styles.icon} />
                                    <span style={styles.slotNumber}>Slot {index + 1}</span>
                                    <span style={styles.slotStatus}>
                                        {status === 1 ? 'Available' : 'Occupied'}
                                    </span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Smart parking sys. All Rights Reserved.</p>
                {/* <p style={styles.footerText}>Contact: info@yourcompany.com</p> */}
            </footer>
        </div>
    );
}

// CSS styles
const styles = {
    container: {
        backgroundImage: 'url(https://yourimagepath.jpg)', // You can replace this with a professional bg image or color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        fontFamily: '"Poppins", sans-serif',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        zIndex: 0,
    },
    header: {
        width: '100%',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1B263B', // Dark background
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
    },
    main: {
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    slotContainer: {
        listStyleType: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        padding: 0,
        width: '100%',
        maxWidth: '1000px',
    },
    slot: {
        width: '150px',
        height: '150px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Softer shadow
        color: 'white',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    slotContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        fontSize: '3rem',
        marginBottom: '10px',
    },
    slotNumber: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    slotStatus: {
        fontSize: '1rem',
        marginTop: '5px',
    },
    loader: {
        fontSize: '1.8rem',
        color: '#fff',
    },
    error: {
        color: '#ff6347',
        fontSize: '1.2rem',
    },
    footer: {
        width: '100%',
        padding: '10px 40px',
        backgroundColor: '#1B263B',
        textAlign: 'center',
        zIndex: 1,
    },
    footerText: {
        color: 'white',
        fontSize: '1rem',
        margin: '5px 0',
    },
};

export default Read;
