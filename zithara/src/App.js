import React, { useState } from 'react';
import { clearFilters } from './clear'; // Import clearFilters function
import data from './data'; // Import your data from data.js
import './index.css';

const App = () => {
    const ITEMS_PER_PAGE = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');
    const [phoneFilter, setPhoneFilter] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [dateFilter, setDateFilter] = useState('');
    const [timeFilter, setTimeFilter] = useState('');

    let filteredData = data.filter(item =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        item.phone.toLowerCase().includes(phoneFilter.toLowerCase()) &&
        item.date.includes(dateFilter) &&
        item.time.includes(timeFilter)
    );

    if (sortBy === 'date') {
        filteredData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'time') {
        filteredData = filteredData.sort((a, b) => new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time));
    } else if (sortBy === 'age') {
        filteredData = filteredData.sort((a, b) => a.age - b.age);
    } else if (sortBy === 'location') {
        // Custom "ahbepatic" order for locations
        const order = ['a', 'h', 'b', 'e', 'p', 'a', 't', 'i', 'c'];
        filteredData = filteredData.sort((a, b) => order.indexOf(a.location.toLowerCase()) - order.indexOf(b.location.toLowerCase()));
    }

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleClearFilters = () => {
        clearFilters(setNameFilter, setPhoneFilter, setSortBy, setDateFilter, setTimeFilter);
    }

    const handleSortChange = (value) => {
        setSortBy(value);
    }

   

    
    return (
        <div>
            <h1>Zithara Data UI Development</h1>
            <div className='pass'>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Search by Phone Number"
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                />
                <div className='gig'>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="date">Date</option>
                        <option value="time">Time</option>
                        <option value="age">Age</option>
                        <option value="location">Location</option>
                    </select>
                    <button onClick={handleClearFilters}> Clear Filters</button>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.phone}</td>
                                <td>{item.location}</td>
                                <td>{item.date} {item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='fif'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => handlePageClick(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;