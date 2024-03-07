import { atom } from "recoil";

export const User = atom({
    key: "User",
    default: {
        isAuthorized: false,
        location: 'Chennai',
        user: {         
        }
    }
  });
  