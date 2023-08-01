import { KEYS } from "@/constants";
import { atom } from "recoil";

export const heritageState = atom<HERITAGE[]>({
    key: KEYS.ATOM_HERITAGE,
    default: [],
});
