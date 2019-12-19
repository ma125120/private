import Users from './user'
import Staff from './staff'
import Room from './room'
import Record from './record'

const api = {
  user: new Users(),
  staff: new Staff(),
  room: new Room(),
  record: new Record(),
};

export default api;