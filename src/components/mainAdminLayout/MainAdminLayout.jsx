import React, {useState} from "react";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import './MainAdminLayout.css';

export default function MainAdminLayout({children, backgroundColor}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => setSearchTerm(term);
    return(
        <div className="admin-layout" style={{ backgroundColor: backgroundColor }}>
                  <NavbarAdmin onSearch={handleSearch}/>
                  <main className="admin-layout__content">
                    {React.isValidElement(children) ? React.cloneElement(children, { searchTerm }) : children} {/* React.cloneElement uses search Term as a prop */}
                  </main>
                </div>
    );
}
