export class FormRequest {
    action: string;
    message: string;
    success: boolean;
    value: {};
    constructor(options: {
        action?: string,
        message?: string,
        success?: boolean,
        value?: {}
    } = {}) {
        this.setAction(options.action || '');
        this.message = options.message || '';
        this.success = options.success || false;
        this.value = options.value || {};
    }

    setAction(action: string) {
        let actions: string[] = ['put', 'post', 'delete'];
        if (actions.indexOf(action) !== -1) {
            this.action = action;
        }
    }
}
