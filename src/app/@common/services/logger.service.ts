import { Injectable } from '@angular/core'
import { LoggerScope } from '@common/enums/logger-scope.enum'

@Injectable()
export class LoggerService {
  // ======================================= //
  private logs: IDictionary = {};
  // ======================================= //
  constructor() { }
  // ======================================= //

  public log(group: LoggerScope | string, ...items: any[]) {
    // ======================================= //
    this.logs[group] = this.logs[group]
      ? this.logs[group]
      : new Array<any>();
    // ======================================= //
    items?.length == 1 && Array.isArray(items[0]) ? this.logs[group] = items[0] : items.forEach(item => this.logs[group].unshift(item));
    this.print();
  }

  private print() {
    console.clear();
    Object.keys(this.logs).forEach(group => {
      console.groupCollapsed(`%c\t\t ${group} List ( ${this.logs[group].length} Items ) \t\t`, `background: #007bff; color: white; font-size:14px; font-weight: bolder`);
      const elements: Array<any> = this.logs[group];
      const maxLngth: number = elements.slice().sort((a, b) => b.name.length - a.name.length)[0].name.length;
      elements.forEach(item => {
        const title: string = this.indentation(item.name, maxLngth)
        console.groupCollapsed(`%c\t\ ${group} item #${item.id} - ${title} \t\t`, `background: #17a2b8; color: white; font-size:14px; font-weight: bolder`);
        console.table(item);
        console.groupEnd()
      })
    });
    console.groupEnd();
  }

  private indentation(name: string, maxLngth: number) {
    const difference: number = name.length < maxLngth ? maxLngth - name.length : 0;
    let output: string = name;
    if (difference > 0) {
      for (let index = 1; index <= difference; index++) {
        if (difference % 2 == 0 && difference / index <= index) {
          output = ` ${output}`;
        }
        else output = `${output} `;
      }
    }
    return output;
  }
}
// ======================================= //
declare interface IDictionary {
  [group: string]: any[];
}