import { storageDb } from "./storage";

export const themeModeAtom = storageDb("color-scheme");

export const freezeTimeLengthAtom = storageDb("freeze-time-length");

export const askBeforeDeleteAtom = storageDb("ask-before-delete");
