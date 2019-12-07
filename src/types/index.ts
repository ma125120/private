export type Staff = {
  id: number;
  name: string;
};

export type Room = {
  id: number;
  name: string;
};

export type Record = {
  staff: Staff;
  room: Room;
  sort: number;
  id: number;
  startTime: string;
  endTime: string;
  count: number;
  note: string;
};
