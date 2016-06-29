export class FormPost {
    editType: string;
    value: {};
    constructor(options: {
        editType?: string,
        value?: {}
    } = {}) {
        this.editType = options.editType || '';
        this.value = options.value || {};
    }
}

export class FormResponse {
    message: string;
    success: boolean;
    value: {};
    constructor(options: {
        message?: string,
        success?: boolean,
        value?: {}
    } = {}) {
        this.message = options.message || '';
        this.success = options.success || false;
        this.value = options.value || {};
    }
}