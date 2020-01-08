import Users from './user'
import Staff from './staff'
import Room from './room'
import Record from './record'
import Act from './act'
import Help from './help'

const api = {
  user: new Users(),
  staff: new Staff(),
  room: new Room(),
  record: new Record(),
  act: new Act(),
  help: new Help()
};

export default api;

export {
  api
}