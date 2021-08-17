export interface Uttalat {
    (key: string, ...arg: any[]): any;

    addBundle(bundle: {}, override?: boolean): void;
    getHtmlMessage(key: string, ...arg: any[]): any;
}

export default function uttalat(): Uttalat;
