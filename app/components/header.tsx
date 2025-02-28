import React, { CSSProperties } from "react";
import { logocompletoinv } from "../../src/assets/img";
import SearchBar from "./SearchBar";

 // Asegúrate de tener este archivo CSS

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logocompletoinv} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Baby Dreams</h1>
      </div>

      {/* <SearchBar /> */}

      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Inicio</a>
        <a href="/about" style={styles.navLink}>Conócenos</a>
        <a href="/about" style={styles.navLink}>Contacto</a>
      </nav>
    </header>
  );
};

export default Header;

const styles: { [key: string]: CSSProperties } = {
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Roboto, sans-serif',
    margin: 0,
  },
  nav: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4DB8FF',
    padding: '15px 30px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  navLink: {
    fontSize: '16px',
    color: '#ffffff',
    textDecoration: 'none',
    marginLeft: '20px',
    fontFamily: 'Roboto, sans-serif',
    position: 'relative',
    padding: '5px 10px',
    transition: 'color 0.3s, borderBottom 0.3s',
  },
  navLinkHover: {
    color: '#1e74b8',
    borderBottom: '2px solid #1e74b8',
  },
  navLinkActive: {
    color: '#1568a0',
  },
};
