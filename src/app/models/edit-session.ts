export class EditSession {
    active: boolean;
    state: string;
    transaction: boolean;
    id: number;
    constructor(options: {
        active?: boolean,
        state?: string,
        transaction?:boolean,
        id?: number
    } = {}) {
        this.active = options.active || false;
        this.setState(options.state || '');
        this.transaction = options.transaction || false;
        this.id = options.id || 0;
    }
    
    setState(state: string) {
        let states:string[] = ["Put", "Post", "Delete"]
        if (states.indexOf(state) !== -1 ) {
            this.state = state
        }
    }

    close(): void {
        this.transaction = false;
        this.active = false;
    }
}