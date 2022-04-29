/* eslint-disable no-console */
const appMeta = require('../../app.json');

const levels = {
  trace: { priority: 10, label: 'TRACE' },
  debug: { priority: 20, label: 'DEBUG' },
  info: { priority: 30, label: 'INFO' },
  warn: { priority: 40, label: 'WARN' },
  error: { priority: 50, label: 'ERROR' },
  none: { priority: 60, label: 'NONE' },
};

const level = process.env.NODE_ENV === 'development' ? 'debug' : 'none';

function formatLog(label: string, tag: string, message: string) {
  return `[${tag || appMeta.name}] ${message}`;
}
export default class Log {
  static d(tag: string, message: string, ...objs: Array<any>) {
    if (levels[level].priority <= 20) {
      console.debug(
        `(${new Date(Date.now()).toTimeString()}) ` + formatLog(levels[level].label, tag, message),
        objs && objs.length > 0 ? objs : '',
      );
    }
  }

  static i(tag: string, message: string, ...objs: Array<any>) {
    if (levels[level].priority <= 30) {
      console.info(
        `(${new Date(Date.now()).toTimeString()}) ` + formatLog(levels[level].label, tag, message),
        objs && objs.length > 0 ? objs : '',
      );
    }
  }

  static w(tag: string, message: string, ...objs: Array<any>) {
    if (levels[level].priority <= 40) {
      console.warn(
        `(${new Date(Date.now()).toTimeString()}) ` + formatLog(levels[level].label, tag, message),
        objs && objs.length > 0 ? objs : '',
      );
    }
  }

  static e(tag: string, message: string, ...objs: Array<any>) {
    if (levels[level].priority <= 50) {
      console.error(
        `(${new Date(Date.now()).toTimeString()}) ` + formatLog(levels[level].label, tag, message),
        objs && objs.length > 0 ? objs : '',
      );
    }
  }
}
