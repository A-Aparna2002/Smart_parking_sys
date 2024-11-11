import React, { useEffect, useState } from "react";
import app from "../fireBaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { FaCar } from "react-icons/fa";
import Header from './header';
import Footer from './footer';

function ParkingSlots() {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={styles.container}>
            <Header />

            <div style={styles.main}>
                {loading ? (
                    <div style={styles.loader}>
                        <div style={styles.spinner}></div>
                    </div>
                ) : error ? (
                    <div style={styles.error}>{error}</div>
                ) : (
                    <div style={styles.slotContainer}>
                        {slots.length === 0 ? (
                            <div>No parking slot data available</div>
                        ) : (
                            slots.map((status, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.slot,
                                        backgroundColor: status === 1 ? '#00A859' : '#D32F2F', // Green for available, Red for occupied
                                    }}
                                >
                                    <FaCar style={styles.icon} />
                                    <div style={styles.slotNumber}>Slot {index + 1}</div>
                                    <div style={styles.slotStatus}>
                                        {status === 1 ? 'Available' : 'Occupied'}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
        paddingTop: '80px', // Account for fixed header height
        paddingBottom: '60px', // Account for fixed footer height
        backgroundColor: '#f0f0f0',
    },
    main: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflowX: 'auto',
        padding: '20px',
        // backgroundColor: 'grey'
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
        width: '200px',
        height: '200px',
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        color: 'white',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    icon: {
        fontSize: '2rem',
        marginBottom: '5px',
    },
    slotNumber: {
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    slotStatus: {
        fontSize: '0.9rem',
        marginTop: '5px',
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    spinner: {
        border: '8px solid #f3f3f3', // Light grey
        borderTop: '8px solid #ff6347', // Blue
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 1s linear infinite',
    },
    error: {
        color: '#ff6347',
        fontSize: '1.2rem',
    },
};

// CSS for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);

export default ParkingSlots;
