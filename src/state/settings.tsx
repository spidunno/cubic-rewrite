import { DefaultColorScheme } from "@mui/joy/styles/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeModeAtom = atomWithStorage<DefaultColorScheme | "system">("cubic-color-scheme", "system", undefined, {getOnInit: true});
