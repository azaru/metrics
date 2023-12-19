import Metric from "@models/metric";

const metricService = {
    async list(name: string | undefined, from: number | undefined, to: number | undefined): Promise<Metric[]> {
        return Metric.find(name, from, to);
    },
    async create(name: string, timestamp: number, value: number): Promise<Metric> {
        return Metric.create( name, timestamp, value );
    },
    async master(): Promise<{ name: string[] }> {
        return Metric.getMaster();
    },
};


export default metricService;