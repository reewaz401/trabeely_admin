import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URI,
	withCredentials: true,
	// headers: {
		// 	'CSRF-Token': csrfToken_generate(),
		//   },
		headers: {
			'Content-Type': 'application/json',
			"Authorization": "Bearer " + localStorage.getItem("_token")
		}
})

export default instance