import axiosInstance from "../services/axiosInstance"

export const getDetails = async () => {
  try {
    const response = await axiosInstance.get("/details");
    return response.data; 
  } catch (error) {
    console.error("Error fetching details:", error);
  }
};

export const searchDetails = async (q) => {
  try {
    const response = await axiosInstance.get("/details/search", {
      params: { q },
    });
    return response.data; 
  } catch (error) {
    console.error("Error searching details:", error);
  }
};


export const suggestDetails = async (host_element, adjacent_element, exposure) => {
  try {
    const response = await axiosInstance.post("/suggest-detail", {
      host_element,
      adjacent_element,
      exposure,
    });
    return response.data; 
  } catch (error) {
    console.error("Error suggesting details:", error);
  }
};