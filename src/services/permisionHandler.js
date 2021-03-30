import axios from '../services/axios'

import { CHECK_PERMISSION, LOGOUT_API } from '../services/api_url'
async function PermissionHandler() {
    try {
        const result = await axios.get(CHECK_PERMISSION)
        if (result.data.success) {
            return result.data;
        } else {
            return false;
        }
    } catch (error) {
        return false
        // localStorage.removeItem('_token')
        // localStorage.removeItem('_auth')
        // if (error.response) {
        //     addToast(error.response.data.message+" Please logout!", {
        //         appearance: "error",
        //         autoDismiss: true,
        //     });
        // }
        // if (error.response) {
        //     alert(error.response.data.message)
        //   }
    }

}
export default PermissionHandler
