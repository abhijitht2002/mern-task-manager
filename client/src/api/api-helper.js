import axios from "axios";
const baseUrl = "http://localhost:3000/api";

// get the token from local storage
const getToken = () => localStorage.getItem("token");

// register user
const registerUser = async (username, password) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error);
    throw error;
  }
};

// login user
const loginUser = async (formdata) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, formdata);
    return res.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    throw error;
  }
};

// get all tasks by user
const getAllTasksByUser = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("error:", error.response?.data || error);
    throw error;
  }
};

// add task
const addTask = async (formData) => {
  const payload = {
    name: formData.name,
    contact_info: `${formData.phone}, ${formData.email}`,
    status: formData.status,
  };

  try {
    const res = await axios.post(`${baseUrl}/tasks`, payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("error:", error.response?.data || error);
    throw error;
  }
};

// delete task
const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("error:", error.response?.data || error);
    throw error;
  }
};

// update task
const updateTask = async (id, formData) => {
  const payload = {
    name: formData.name,
    contact_info: `${formData.phone}, ${formData.email}`,
    status: formData.status,
  };

  try {
    const res = await axios.patch(`${baseUrl}/tasks/${id}`, payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("error:", error.response?.data || error);
    throw error;
  }
};

// export functions
export {
  getToken,
  registerUser,
  loginUser,
  getAllTasksByUser,
  addTask,
  updateTask,
  deleteTask,
};
