import React, { CSSProperties } from 'react';

const MainComponent = () => {
    return (
        <div style={styles.container}>
            <div style={styles.categoryLinks}>
                <a href="#" style={styles.link}>Cuna</a>
                <a href="#" style={styles.link}>Baño</a>
                <a href="#" style={styles.link}>Comida</a>
                <a href="#" style={styles.link}>Ropa</a>
            </div>

            {/* Espacio reservado para el carrusel */}
            <div style={styles.carousel}>
                Carrusel aquí
            </div>

            <div style={styles.productGrid}>
                <div style={styles.productCard}>Producto Cuna</div>
                <div style={styles.productCard}>Producto 2</div>
                <div style={styles.productCard}>Producto 3</div>
                <div style={styles.productCard}>Producto 4</div>
                <div style={styles.productCard}>Producto 5</div>
                <div style={styles.productCard}>Producto 6</div>
                <div style={styles.productCard}>Producto 7</div>
                <div style={styles.productCard}>Producto 8</div>
            </div>
        </div>
    );
};

export default MainComponent;

const styles: { [styles: string]: CSSProperties } = {
    container: {
        backgroundColor: '#ffffff',
        paddingInline: '16px',
        minHeight: '65vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    navLinks: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        gap: '32px',
        marginBottom: '16px',
        color: '#3b82f6',
        fontSize: '1rem',
        fontWeight: '500'
    },
    categoryLinks: {
        width: '100%',
        justifyContent: 'space-around',
        display: 'flex',
        gap: '24px',
        marginBottom: '24px',
        padding: '8px',
        color: '#374151',
        fontSize: '1.1rem',
        border: '1px solid #ccc',
    },
    link: {
        color: '#3b82f6',
        textDecoration: 'none',
        transition: 'color 0.3s',
        cursor: 'pointer',
    },
    carousel: {
        marginBottom: '24px',
        minHeight: '200px',
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#646464',
        borderRadius: '8px',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '1200px',
    },
    productCard: {
        backgroundColor: '#c2c2c2',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.7)',
        textAlign: 'center',
        color: '#374151'
    }
};