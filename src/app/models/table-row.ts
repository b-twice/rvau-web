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
        let states: string[] = ['None', 'Put', 'Post', 'Delete']
        if (states.indexOf(action) !== -1) {
            this.state = action
        }
    }
}