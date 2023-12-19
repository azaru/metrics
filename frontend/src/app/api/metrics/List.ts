import { FilterData } from '../../types';
import CONSTANTS from '../../../constants';

const List = (filterData: FilterData | undefined) => {


    const { name, from, to } = filterData || {};
    
    const url = new URL(CONSTANTS.endpoints.metrics.list.path, CONSTANTS.host || window.location.origin);
    
    if (name) {
        url.searchParams.append('name', name);
    }
    
    if (from) {
        url.searchParams.append('from', from.toString());
    }
    
    if (to) {
        url.searchParams.append('to', to.toString());
    }
    
    return fetch(url.toString(), {
        method:  CONSTANTS.endpoints.metrics.list.method,
        headers: {
        'Content-Type': 'application/json',
        },
    });
};

export default List;