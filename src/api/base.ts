import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";
import dayjs from 'dayjs';

function toBombTime(str) {
  if (typeof str === 'string') {
    return { '__type': 'Date', iso: dayjs(str).format(`YYYY-MM-DD HH:mm:ss`), }
  } else if (str.__type === 'Date') {
    return str
  }
}

export default class BaseApi {
  tableName = ''
  timeFields = []
  omitFields = []
  sort = ''

  _query(obj: any, filters = []) {
    const query = Bmob.Query(this.tableName);
    for (let key in obj) {
      query.equalTo(key, "==", obj[key]);
    }
    filters.forEach(v => {
      query.equalTo(v[0], v[1], v[1] === '!=' ? v[2] : toBombTime(v[2]));
    });
    if (this.sort) {
      query.order(this.sort)
    }

    return query.find();
  }

  _getQuery(filters) {
    const query = Bmob.Query(this.tableName);
    filters.forEach(v => {
      query.equalTo(v[0], v[1], (v[1] === '!=' || v[1] === '==') ? v[2] : toBombTime(v[2]));
    });

    return query;
  }
  getQueryOr(...args) {
    const query = Bmob.Query(this.tableName);
    let arr = args.map(v => this._getQuery(v))

    query.or(...arr)
    return query.find();
  }

  _edit(obj: any = {}) {
    const query = Bmob.Query(this.tableName);
    this.timeFields.forEach(v => {
      if (obj[v]) {
        obj[v] = toBombTime(obj[v]);
      }
    });
    this.omitFields.forEach(v => {
      delete obj[v]
    })

    if (obj.objectId) {
      delete obj.createdAt;
      delete obj.updatedAt;
    }

    for (let key in obj) {
      query.set(key === 'objectId' ? 'id' : key, obj[key]);
    }

    return query.save()
  }

  _del(obj: any = {}) {
    const query = Bmob.Query(this.tableName);
    return query.destroy(obj.objectId)
  }
  toBombTime = toBombTime
}

