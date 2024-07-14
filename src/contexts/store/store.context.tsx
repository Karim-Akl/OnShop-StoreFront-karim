import { API_ENDPOINTS } from '@utils/constants';
import { defaultAPI } from 'src/api/axios';

export const getDomainName = () => {
    if (typeof window !== 'undefined') {
        const domain = window.location.host;
        if (domain.includes('localhost') || domain.includes('vercel')) {
            return 'freejswaeleh.com';
        }
        return domain;
    } else {
        console.log('Running on the server');
        return '';
    }
};

export const fetchStoreInfo = async () => {
    const domain = getDomainName();
    const { data } = await defaultAPI.get(API_ENDPOINTS.STORE_INFO, {
        headers: {
            'store-domain': domain,
        },
    });
    return data?.data?.id;
};