import Users from './user'
import Staff from './staff'
import Room from './room'

const api = {
  user: new Users(),
  staff: new Staff(),
  room: new Room(),
};

export default api;