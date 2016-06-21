export class Table {
    title: string
    columns: {name: string, width: number, values: any[]}[] = [];
    constructor(title: string, columns: {} = {} )
    {   
        this.title = title;
        this.columns =  columns['columns'] || [];
    }
}