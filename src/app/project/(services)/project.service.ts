import { projectValidationSchema } from "@/app/components/CreatProjectForm";
import { EditProjectValidationSchema } from "@/app/components/EditProjectForm";

export async function getAllProjectManagers() {
  try {
    const response = await fetch("/api/manager", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error getting maangers");
    }

    return await response.json();
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}

export async function createProject(body: any) {
  try {
    const data = await projectValidationSchema.validate(body);
    const resp = await fetch("api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return resp.json();
  } catch (error) {
    console.log("Error creating project", error);
    throw error;
  }
}

export async function updateProjectById(id: string, body: any) {
  try {
    const data = await EditProjectValidationSchema.validate(body);
    const resp = await fetch(`api/project/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resp.ok) {
      throw new Error("Error updating project");
    }
    return resp.json();
  } catch (error) {
    console.log("Error creating project", error);
    throw error;
  }
}

export async function deleteProjectById(projectId: string) {
  try {
    const resp = await fetch(`/api/project/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Unable to delete project");
    }
    return resp;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
