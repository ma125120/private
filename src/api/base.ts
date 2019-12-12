import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";

export default class BaseApi {
  tableName = ''
  timeFields = []
  _query(obj, filters = []) {
    const query = Bmob.Query(this.tableName);
    for (let key in obj) {
      query.equalTo(key, "==", obj[key]);
    }
    filters.forEach(v => {
      query.equalTo(v[0], v[1], v[2]);
    });

    return query.find();
  }

  _edit(obj = {}) {
    const query = Bmob.Query(this.tableName);
    this.timeFields.forEach(v => {
      obj[v] = toBombTime(obj[v]);
    })
    for (let key in obj) {
      query.set(key, obj[key]);
      // query.set(key === 'objectId' ? 'id' : key, obj[key]);
    }

    return query.save()
  }
  
}

function toBombTime(str) {
  if (typeof str === 'string') {
    return { '__type': 'Date', iso: str, }
  } else if (str.__type === 'Date') {
    return str
  }
}