import Api from '../Api';
import { getRequest } from '../ApiUtils';

const getRidesApi = async (requestParams: {}): Promise<any> => {
    return getRequest({
        route: 'https://mp7f6470f533c4c3f78b.free.beeceptor.com/rides',
        axiosClient: Api.authorized_axios_client_v3,
    });
};

const getPaymentSuccessApi = async (requestParams: {}): Promise<any> => {
    return getRequest({
        route: 'https://mpd1de62872d122235ad.free.beeceptor.com/paymentSuccess',
        axiosClient: Api.authorized_axios_client_v3,
    });
};

const getPaymentFailedApi = async (requestParams: {}): Promise<any> => {
    return getRequest({
        route: 'https://mp89d6d76adcdaabb9f3.free.beeceptor.com/paymentFailed',
        axiosClient: Api.authorized_axios_client_v3,
    });
};

export default {
    getRidesApi,
    getPaymentSuccessApi,
    getPaymentFailedApi,
};
