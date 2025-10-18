import fetchService from "./fetchService";

const API_URL =  "http://localhost:8080";

// GET
export async function getResources() {
  try {
      return await fetchService.get('/users/resources');
  } catch (error) {
      console.error("❌ Error al obtener recursos:", error);
      throw error;
  }
}

export async function getResourceById(id) {
  try {
      return await fetchService.get(`/users/resources/${id}`);
  } catch (error) {
      console.error("❌ Error al obtener el recurso:", error);
      throw error;
  }
}

// ADMIN

// GET
export async function getAdminResources() {
  try {
      return await fetchService.get('/admin/resources');
  } catch (error) {
      console.error("❌ Error al obtener recursos de admin:", error);
      throw error;
  }
}


// POST
export async function createResource(resourceData) {
  try {
      const formData = new FormData();
      formData.append("name", resourceData.name);
      formData.append("intro", resourceData.intro);
      formData.append("description", resourceData.description);
      if (resourceData.imageFile) formData.append("image", resourceData.imageFile);
      if (resourceData.pdfFile) formData.append("pdf", resourceData.pdfFile);

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
          },
          body: formData,
      });

      if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          throw new Error('Token expired');
      }

      if (!response.ok) {
          throw new Error(`Error al crear recurso (${response.status})`);
      }

      return await response.json();
  } catch (error) {
      console.error("❌ Error al crear recurso:", error);
      throw error;
  }
}


// PUT
export async function updateResource(id, resourceData) {
  try {
      const formData = new FormData();
      formData.append("name", resourceData.name);
      formData.append("intro", resourceData.intro);
      formData.append("description", resourceData.description);
      if (resourceData.imageFile) formData.append("image", resourceData.imageFile);
      if (resourceData.pdfFile) formData.append("pdf", resourceData.pdfFile);

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/admin/resources/${id}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
          },
          body: formData,
      });

      if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          throw new Error('Token expired');
      }

      if (!response.ok) {
          throw new Error(`Error al actualizar recurso (${response.status})`);
      }

      return await response.json();
  } catch (error) {
      console.error("❌ Error al actualizar recurso:", error);
      throw error;
  }
}

// DELETE
export async function deleteResource(id) {
  try {
      await fetchService.delete(`/admin/resources/${id}`);
      return true;
  } catch (error) {
      console.error("❌ Error al eliminar recurso:", error);
      throw error;
  }
}