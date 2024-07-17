import { projectValidationSchema } from "@/app/components/CreatProjectForm";

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
