import axios from '../services/axios'
import { CHECK_PERMISSION } from '../services/api_url'
async function PermissionHandler() {
 
   try {
    const result = await axios.get(CHECK_PERMISSION)
    if (result.data.success) {
        return result.data;
    } else{
        return false;
    }
   } catch (error) {
    return false;

    // if (error.response) {
    //     alert(error.response.data.message)
    //   }
   }

}
export default PermissionHandler
