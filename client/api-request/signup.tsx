import axios from 'axios';
import Cookies from 'js-cookie'
import config from './config';

export const userSignup = async (data: any) => {
    const reqData = JSON.stringify(data)
    try {
        const response = await axios({
            method: 'post',
            url: `${config.API_DOMAIN_URL}/api/v1/auth/signup`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: reqData
        });
        const responseData = await response.data;
        return responseData
    } catch (err: any) {
        return err.response.data
    }
  }