import { createAdminUser } from "./script";
import User from "./models/users";

const isDev = true
const dbInit = async() => {
    await User.sync({alter:isDev});
    
}

export default dbInit