export class FormSubmit {
    message: string;
    success: boolean;
    editType: string;
    value: {};
    constructor(options: {
        message?: string,
        success?: boolean,
        editType?: string,
        value?: {}
    } = {}) {
        this.message = options.message || '';
        this.success = options.success || false;
        this.editType = options.editType || '';
        this.value = options.value || {};
    }
}