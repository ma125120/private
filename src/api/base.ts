import Bmob from "@/plugins/bmob/Bmob-2.2.1.min.js";

export default class BaseApi {
  tableName = ''
  timeFields = []
  _query(obj: any, filters = []) {
    const query = Bmob.Query(this.tableName);
    for (let key in obj) {
      query.equalTo(key, "==", obj[key]);
    }
    filters.forEach(v => {
      query.equalTo(v[0], v[1], v[2]);
    });

    return query.find();
  }

  _edit(obj: any = {}) {
    const query = Bmob.Query(this.tableName);
    this.timeFields.forEach(v => {
      obj[v] = toBombTime(obj[v]);
    });

    if (obj.objectId) {
      delete obj.createdAt;
      // delete obj.objectId;
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
  
}

function toBombTime(str) {
  if (typeof str === 'string') {
    return { '__type': 'Date', iso: str, }
  } else if (str.__type === 'Date') {
    return str
  }
}