import { atom } from "jotai";

const sidebarCollapsedLocalstorageKey = "qubic-sidebar-collapsed";

const baseSidebarCollapsedStateAtom = atom(localStorage.getItem(sidebarCollapsedLocalstorageKey) === "true");
export const sidebarCollapsedAtom = atom<boolean, [boolean], void>(
	(get) => get(baseSidebarCollapsedStateAtom),
	(_get, set, arg) => {
		localStorage.setItem(sidebarCollapsedLocalstorageKey, arg.toString())
		set(baseSidebarCollapsedStateAtom, arg);
	}
);

// sidebarCollapsedAtom.