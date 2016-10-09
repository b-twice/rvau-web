export class GetResponse {
    table: string;
    data: {}[];
    keys: string[];
    constructor(options: {
        table?: string
        data?: {}[],
        keys?: string[],
    } = {}) {
        this.table = options.table || '';
        this.data = options.data || [];
        this.keys = options.keys || [];
    }
}
