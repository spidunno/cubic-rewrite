import { atom } from "jotai";
import { Session, sessionsDb} from "./storage";
import { settingsAtom } from "./settings";

export const currentSessionIdAtom = atom((get) => {
	return get(settingsAtom)["current-session"];
},
(get, set, newId: string) => {
	const settings = get(settingsAtom);
	set(settingsAtom, {
		...settings,
		"current-session": newId
	});
});

export const currentSessionAtom = atom(get => {
	const currentSessionId = get(currentSessionIdAtom);
	return get(sessionsDb.item(currentSessionId));
},
(get,set, session: Session) => {
	const currentSessionId = get(currentSessionIdAtom);
	set(sessionsDb.item(currentSessionId), {...session});
});

