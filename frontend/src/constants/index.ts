const CONSTANTS = {
    host: 'http://localhost:3001',
    endpoints: {
        metrics: {
            list: {
                path: '/metrics',
                method: 'GET',
            },
            create: {
                path: '/metrics',
                method: 'POST',
            },
            master: {
                path: '/master',
                method: 'GET',
            },
        }
    },
    defaultFilterData: {
        name: '',
        from: Date.now() - 2 * 60 * 60 * 1000,
        to: Date.now(),
    },
};   

export default CONSTANTS;
