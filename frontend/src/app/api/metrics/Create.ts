import { DataPoint } from '../../types';
import CONSTANTS from '../../../constants';

const Create = (data: DataPoint) => {
    
        const url = new URL(CONSTANTS.host + CONSTANTS.endpoints.metrics.create.path);
    
        return fetch(url.toString(), {
            method:  CONSTANTS.endpoints.metrics.create.method,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

};

export default Create;