import axios from '../services/axios'
import { CHECK_PERMISSION } from '../services/api_url'
async function PermissionHandler() {
    const result = await axios.get(CHECK_PERMISSION)
    if (result.data.success) {
        return result.data;
    } else {
        return false
    }
}
export default PermissionHandler
