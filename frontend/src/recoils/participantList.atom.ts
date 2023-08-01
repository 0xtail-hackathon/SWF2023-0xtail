import { KEYS } from "@/constants";
import { atom } from "recoil";

const defaultValue = [
    {
        profileUrl: "/images/Profile_1.svg",
        username: "user1",
    },
    {
        profileUrl: "/images/Profile_2.svg",
        username: "user2",
    },
    {
        profileUrl: "/images/Profile_3.svg",
        username: "user3",
    },
    {
        profileUrl: "/images/Profile_4.svg",
        username: "user4",
    },
    {
        profileUrl: "/images/Profile_5.svg",
        username: "user5",
    },
    {
        profileUrl: "/images/Profile_6.svg",
        username: "user6",
    },
];

export const participantListState = atom<UserInfo[]>({
    key: KEYS.ATOM_PARTICIPANT_LIST,
    default: defaultValue,
});
