export interface Uttalat {
    (key: string, ...arg: any[]): any;

    addBundle(bundle: {}): void;
    getHtmlMessage(key: string, ...arg: any[]): any;
}

export default function uttalat(): Uttalat;
