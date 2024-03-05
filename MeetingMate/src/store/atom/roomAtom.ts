import { atom } from "recoil";
import { Rooms } from "../../interfaces/commonInterface";

export const Room = atom<Rooms[]>({
    key: "Room",
    default: []
  });
  