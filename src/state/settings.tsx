import { DefaultColorScheme } from "@mui/joy/styles/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DbShape, storageDb } from "./storage";

// export const themeModeAtom = atomWithStorage<DefaultColorScheme | "system">("cubic-color-scheme", "system", undefined, {getOnInit: true});
export const themeModeAtom = storageDb("color-scheme");

export const freezeTimeLengthAtom = storageDb("freeze-time-length");