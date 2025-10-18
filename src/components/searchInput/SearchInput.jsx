import React, {useState} from 'react';
import './SearchInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchInput({ placeholder="Buscar...", onSearch }) {
    const [filteredResources, setFilteredResources] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (searchTerm) => {
        const filtered = resources.filter(r =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.intro.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResources(filtered);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);

        if (onSearch) {
            onSearch(e.target.value) // real time search
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSearch) {
            onSearch(searchValue) // search when it's send
        }
    };

    return(
        <section className="search-input">
            <div className="search-input__content" onSubmit={handleSubmit}>
                <article className="search-input__container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="faMagnifyingGlass"/>
                    <input type="text" value={searchValue} onChange={handleInputChange} placeholder={placeholder} className="search-input__field" />
                </article>
            </div>
        </section>
    );
}