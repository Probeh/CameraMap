import { Injectable } from '@angular/core'
import { LogScope } from '@common/enums/logscope.enum'

@Injectable()
export class LoggerService {
  // ======================================= //
  private logs: IDictionary = {};
  // ======================================= //
  constructor() { }
  // ======================================= //

  public log(group: LogScope | string, ...items: any[]) {
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
      this.logs[group].forEach(item => {
        console.groupCollapsed(`%c\t\ ${group} item #${item.id} - ${item.name} \t\t`, `background: #17a2b8; color: white; font-size:14px; font-weight: bolder`);
        console.table(item);
        console.groupEnd()
      })
    });
    console.groupEnd();
  }
}

// ======================================= //
declare interface IDictionary {
  [group: string]: any[];
}