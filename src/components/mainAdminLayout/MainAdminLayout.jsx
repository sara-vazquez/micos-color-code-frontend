import React from "react";
import NavbarAdmin from "../navbarAdmin/NavbarAdmin";
import './MainAdminLayout.css';

export default function MainAdminLayout({children, backgroundColor}) {
    return(
        <div className="admin-layout" style={{ backgroundColor: backgroundColor }}>
                  <NavbarAdmin />
                  <main className="admin-layout__content">
                    {children}
                  </main>
                </div>
    );
}
