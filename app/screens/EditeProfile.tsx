import React, { useState, CSSProperties } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const EditProfileComponent = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        contrasena: '',
        confirmarContrasena: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Editar Perfil</h2>
                <FaUserCircle size={32} style={{ color: '#6b7280' }} />
            </div>

            {['Nombre', 'Correo Electrónico', 'Teléfono', 'Contraseña', 'Confirmar Contraseña'].map((label, index) => (
                <div key={index}>
                    <label>{label}</label>
                    <input
                        type={label.toLowerCase().includes('contraseña') ? 'password' : 'text'}
                        name={label.toLowerCase().replace(/ /g, '')}
                        placeholder={label}
                        style={styles.input}
                        value={formData[label.toLowerCase().replace(/ /g, '')]}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <button style={{ ...styles.button, ...styles.primaryButton }}>ACTUALIZAR PERFIL</button>
            <button style={{ ...styles.button, ...styles.secondaryButton }}>VOLVER AL CONTROL</button>
        </div>
    );
};

export default EditProfileComponent;

const styles: { [styles: string]: CSSProperties } = {
    container: {
        backgroundColor: '#f3f4f6',
        padding: '24px',
        borderRadius: '16px',
        maxWidth: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        color: '#374151',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#f3f4f6',
        padding: '8px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        width: '100%',
        fontSize: '1rem',
        boxSizing: 'border-box'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        color: '#ffffff',
        marginTop: '8px'
    },
    primaryButton: {
        backgroundColor: '#3b82f6'
    },
    secondaryButton: {
        backgroundColor: '#60a5fa'
    }
};