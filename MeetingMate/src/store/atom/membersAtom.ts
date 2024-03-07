import { atom } from "recoil";
import {  User } from "../../interfaces/commonInterface";

export const Members = atom<User[]>({
    key: "Members",
    default: []
  });
  