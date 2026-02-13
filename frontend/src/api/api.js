import axiosInstance from "../services/axiosInstance"




export const getDetails = async()=>{
    try {
        const response = await axiosInstance.get("/details")
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const searchDetails = async(q)=>{
    try {
        const response = await axiosInstance.get(`/search?q=${q}`)
        return response
    } catch (error) {
        console.log(error.message)
    }
} 


export const suggestDetails = async(host_element, adjacent_element, exposure)=>{
    try {
        const response = await axiosInstance.post("/suggest-detail", {host_element, adjacent_element, exposure})
        return response
    } catch (error) {
        console.log(error.message)
    }
}