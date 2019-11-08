import axios from "axios"

// Create an axios helper with some predefined values
export default function() {
	return axios.create({
		baseURL: "http://localhost:5000",
	})
}