import { atom } from "jotai";

const sidebarCollapsedLocalstorageKey = "qbq-sidebar-collapsed";
const footerOpenLocalstorageKey = "qbq-footer-open";


const baseSidebarCollapsedStateAtom = atom(localStorage.getItem(sidebarCollapsedLocalstorageKey) === "true");
export const sidebarCollapsedAtom = atom<boolean, [boolean], void>(
	(get) => get(baseSidebarCollapsedStateAtom),
	(_get, set, arg) => {
		localStorage.setItem(sidebarCollapsedLocalstorageKey, arg.toString())
		set(baseSidebarCollapsedStateAtom, arg);
	}
);

const baseFooterOpenStateAtom = atom(localStorage.getItem(sidebarCollapsedLocalstorageKey) === "true");
export const footerOpenAtom = atom<boolean, [boolean], void>(
	(get) => get(baseFooterOpenStateAtom),
	(_get, set, arg) => {
		localStorage.setItem(footerOpenLocalstorageKey, arg.toString())
		set(baseFooterOpenStateAtom, arg);
	}
);

// sidebarCollapsedAtom.