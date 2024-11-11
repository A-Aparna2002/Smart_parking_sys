import React from "react";

function Footer() {
    return (
        <footer style={styles.footer}>
            <p style={styles.footerText}>© 2024 Smart Parking Sys. All Rights Reserved.</p>
        </footer>
    );
}

const styles = {
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

export default Footer;
