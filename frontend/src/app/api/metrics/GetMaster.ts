import CONSTANTS from '../../../constants';

const GetMaster = () => {


    const url = new URL(CONSTANTS.endpoints.metrics.master.path, CONSTANTS.host || window.location.origin);
    
    
    return fetch(url.toString(), {
        method:  CONSTANTS.endpoints.metrics.master.method,
        headers: {
        'Content-Type': 'application/json',
        },
    });
};

export default GetMaster;