import { atom } from "recoil";
import { Meetings } from "../../interfaces/commonInterface";

export const Meeting = atom<Meetings[]>({
    key: "Meeting",
    default: []
  });
  