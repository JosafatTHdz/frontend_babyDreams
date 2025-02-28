import { CSSProperties } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const FooterComponent = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.section}>
                <h2 style={styles.title}>Enlaces de Interés</h2>
                <ul style={styles.linkList}>
                    <li style={styles.linkItem}><a href="#" style={styles.link}>Políticas de privacidad</a></li>
                    <li style={styles.linkItem}><a href="#" style={styles.link}>Términos y condiciones</a></li>
                    <li style={styles.linkItem}><a href="#" style={styles.link}>Preguntas frecuentes</a></li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.title}>Redes sociales</h2>
                <div style={styles.socialIcons}>
                    <a href="#" ><FaFacebook size={24} /></a>
                    <a href="#" ><FaInstagram size={24} /></a>
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.title}>Contacto</h2>
                <p style={styles.contact}>contacto@ejemplo.com</p>
            </div>
        </footer>
    );
};

export default FooterComponent;

const styles: { [key: string]: CSSProperties } = {
    footer: {
        backgroundColor: '#191919',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #e5e7eb',
        marginTop: '24px'
    },
    section: {
        marginBottom: '16px',
        textAlign: 'center'
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '8px'
    },
    linkList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    linkItem: {
        marginBottom: '8px'
    },
    link: {
        color: '#374151',
        textDecoration: 'none',
        transition: 'color 0.2s',
        cursor: 'pointer'
    },
    linkHover: {
        color: '#1f2937'
    },
    socialIcons: {
        display: 'flex',
        gap: '16px',
        color: '#6b7280'
    },
    contact: {
        color: '#4b5563'
    }
};