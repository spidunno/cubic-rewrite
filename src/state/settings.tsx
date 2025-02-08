import { DefaultColorScheme } from "@mui/joy/styles/types";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { defaultSession } from "./storage";
import {focusAtom} from 'jotai-optics'

export interface SettingsShape {
    "current-session": string;
	"color-scheme": DefaultColorScheme | "system";
	"freeze-time-length": number;
	"ask-before-delete": boolean;
}

export const defaultFreezeTimeLength = 200;

const settingsStorage = createJSONStorage<SettingsShape>(() => localStorage);

export const settingsAtom = atomWithStorage<SettingsShape>("settings", {
        "current-session": defaultSession.id,
        "color-scheme": "system",
        "freeze-time-length": defaultFreezeTimeLength,
        "ask-before-delete": true,
}, settingsStorage, {
    getOnInit: true
});



export const colorSchemeAtom = focusAtom(settingsAtom, (optic) => optic.prop('color-scheme'));
export const freezeTimeLengthAtom = focusAtom(settingsAtom, (optic) => optic.prop('freeze-time-length'));
export const askBeforeDeleteAtom = focusAtom(settingsAtom, (optic) => optic.prop('ask-before-delete'));
