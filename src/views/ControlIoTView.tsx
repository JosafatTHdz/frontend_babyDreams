import React, { useState, CSSProperties } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ControlCunaComponent = () => {
    const [movimientoCuna, setMovimientoCuna] = useState(false);
    const [carruselJuguete, setCarruselJuguete] = useState(false);
    const [melodia, setMelodia] = useState('SILENCIO');
    const [temperatura, setTemperatura] = useState(22);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Control de la cuna automatizada</h2>
                <FaUserCircle size={24} style={{ color: '#6b7280' }} />
            </div>
            <button style={styles.button}>
                Mostrar historial de eventos
            </button>

            <p style={styles.text}>Temperatura: {temperatura}°C</p>

            <div style={styles.switchContainer}>
                <label>Movimiento de la cuna</label>
                <input
                    type="checkbox"
                    checked={movimientoCuna}
                    onChange={() => setMovimientoCuna(!movimientoCuna)}
                    style={styles.switch}
                />
            </div>

            <div style={styles.switchContainer}>
                <label>Carrusel de juguete</label>
                <input
                    type="checkbox"
                    checked={carruselJuguete}
                    onChange={() => setCarruselJuguete(!carruselJuguete)}
                    style={styles.switch}
                />
            </div>

            <div style={styles.switchContainer}>
                <label>Melodía</label>
                <button
                    onClick={() => setMelodia(melodia === 'SILENCIO' ? 'ACTIVA' : 'SILENCIO')}
                    style={styles.melodyButton(melodia === 'ACTIVA')}
                >
                    {melodia}
                </button>
            </div>

            <button style={styles.button}>
                Temporizador de movimiento cuna
            </button>
        </div>
    );
};

export default ControlCunaComponent;

interface Styles {
    container: CSSProperties;
    header: CSSProperties;
    title: CSSProperties;
    button: CSSProperties;
    text: CSSProperties;
    switchContainer: CSSProperties;
    switch: CSSProperties;
    melodyButton: (active: boolean) => CSSProperties;
}

const styles: Styles = {
    container: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.7',
        padding: '24px',
        borderRadius: '16px',
        maxWidth: '400px',
        margin: '0 auto',
        color: '#374151'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '600'
    },
    button: {
        backgroundColor: '#ffffff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
        width: '100%',
        padding: '8px',
        marginBottom: '16px',
        color: '#374151'
    },
    text: {
        marginBottom: '16px',
        color: '#374151'
    },
    switchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
    },
    switch: {
        width: '24px',
        height: '24px'
    },
    melodyButton: (active: boolean) => ({
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: active ? '#60a5fa' : '#d1d5db',
        color: active ? '#ffffff' : '#374151'
    })
};