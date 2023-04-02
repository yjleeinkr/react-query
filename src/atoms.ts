import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // unique한 key값
  default: false,
})