export async function handleLogin(data: { email: string; password: string }) {
  try {
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    if (!resp.ok) {
      throw new Error("Invalid credentials");
    }
    return resp.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function handleUserSignup(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const resp = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    if (!resp.ok) {
      throw new Error("Error creating user");
    }
    return resp.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
