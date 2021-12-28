export class LocalStorage {

  constructor() {}

  setItem(key: any, value: any) {
    window.localStorage.setItem(this.getKeyValue(key), JSON.stringify(value));
  }

  getItem(key: any): any {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem(this.getKeyValue(key)));
  }

  removeItem(key: any) {
    window.localStorage.removeItem(this.getKeyValue(key));
  }

  clear() {
    window.localStorage.clear();
  }

  getKeyValue(key: any): string {
    return key;
  }
}
