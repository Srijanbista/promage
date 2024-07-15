export async function handleLogin(data: { email: string; password: string }) {
  try {
    const resp = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
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
    const resp = await fetch("http://localhost:3000/api/user/create", {
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
    return resp.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
