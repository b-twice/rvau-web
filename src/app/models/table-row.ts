export class TableRow {
    state: string;
    value: {};
    constructor(options: {
        state?: string;
        value?: {}
    } = {}) {
        this.setAction(options.state || '');
        this.value = options.value || {};
    }

    setAction(action: string) {
        let states: string[] = ['none', 'put', 'post', 'delete']
        if (states.indexOf(action) !== -1) {
            this.state = action
        }
    }
}