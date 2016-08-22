export class GetRequest {
    action: string;
    message: string;
    success: boolean;
    params: {};
    results: any[];
    table: string;
    constructor(options: {
        action?: string,
        message?: string,
        success?: boolean,
        params?: {},
        results?: any[],
        table?: string
    } = {}) {
        this.action = options.action || '';
        this.message = options.message || '';
        this.success = options.success || false;
        this.params = options.params || {};
        this.results = options.results || [];
        this.table = options.table || '';
    }
}
