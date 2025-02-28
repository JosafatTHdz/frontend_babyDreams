// Author: Josafat Tapia
// Date: 20/01/2021
// Import the necessary libraries and dependencies
import { HiMagnifyingGlass } from "react-icons/hi2";
import React, { CSSProperties } from 'react';

// Type: Component
const SearchBar = () => {
    return (
        <div className="search-bar" style={styles.searchBar}>
            <input type="text" placeholder="Search..." style={styles.input}/>
            <HiMagnifyingGlass color={styles.icon.color}/>
        </div>
    )
}

export default SearchBar

const styles: { [key: string]: CSSProperties } = {
    searchBar: {
        width: '500px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        borderRadius: '5px',
    },
    input: {
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        flex: 1,
        fontSize: '16px',
        color: '#333',
    },
    icon: {
        color: '#333',
    },
}