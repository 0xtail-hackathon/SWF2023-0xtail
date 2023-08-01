import { KEYS } from "@/constants";
import { atom } from "recoil";

export const selectedItemState = atom<HERITAGE | null>({
    key: KEYS.ATOM_SELECTED_ITEM,
    default: null,
});
