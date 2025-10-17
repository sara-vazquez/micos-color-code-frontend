const API_URL =  "http://localhost:8080";

//Get token from localStorage
function getAuthHeaders() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado. El usuario no está autenticado.");
    return {
      Authorization: `Bearer ${token}`,
    };
}

// GET
export async function getResources() {

    const response = await fetch(`${API_URL}/resources`, {
        method: "GET",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error al obtener recursos (${response.status})`);
    }
    
    return await response.json();
}

export async function getResourceById(id) {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error al obtener el recurso (${response.status})`);
    }
  
    return await response.json();
}

// ADMIN

// GET
export async function getAdminResources() {
    const response = await fetch(`${API_URL}/admin/resources`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error al obtener recursos de admin (${response.status})`);
    }
  
    return await response.json();
}

// POST
export async function createResource(resourceData) {
    const formData = new FormData();
    formData.append("name", resourceData.name);
    formData.append("intro", resourceData.intro);
    formData.append("description", resourceData.description);
    if (resourceData.imageFile) formData.append("image", resourceData.imageFile);
    if (resourceData.pdfFile) formData.append("pdf", resourceData.pdfFile);
  
    const response = await fetch(`${API_URL}/admin/resources`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`Error al crear recurso (${response.status})`);
    }
  
    return await response.json();
}


// PUT
export async function updateResource(id, resourceData) {
    const formData = new FormData();
    formData.append("name", resourceData.name);
    formData.append("intro", resourceData.intro);
    formData.append("description", resourceData.description);
    if (resourceData.imageFile) formData.append("image", resourceData.imageFile);
    if (resourceData.pdfFile) formData.append("pdf", resourceData.pdfFile);
  
    const response = await fetch(`${API_URL}/admin/resources/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`Error al actualizar recurso (${response.status})`);
    }
  
    return await response.json();
  }

// DELETE
export async function deleteResource(id) {
    const response = await fetch(`${API_URL}/admin/resources/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error al eliminar recurso (${response.status})`);
    }
  
    return true;
}

