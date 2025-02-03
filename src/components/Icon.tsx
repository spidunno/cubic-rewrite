import { PropsOf } from "@emotion/react";
import { styled } from "@mui/joy";
import "../assets/material-symbols";
import { MaterialSymbol } from "../assets/material-symbols";

export const IconSpan = styled("span")(() => ({color: "var(--Icon-color)", margin: "var(--Icon-margin)", fontSize: "var(--Icon-fontSize, 20px)", width: "1em", height: "1em"}));

type IconProps = Omit<PropsOf<typeof IconSpan>, "children"> & {
	variant?: "outlined" | "rounded" | "sharp";
	filled?: boolean;
	icon: MaterialSymbol;
};
export function Icon(props: IconProps) {
	const { variant, filled, sx, icon, ...spanProps } = props;

	return (
		<IconSpan
			{...spanProps}
			sx={{
				userSelect: "none",
				fontVariationSettings: `'FILL' ${
					filled ? "1" : "0"
				}, 'wght' 400, 'GRAD' 0`,
				fontOpticalSizing: 'auto',
				transition: "font-variation-settings 75ms ease-out",
				...sx,
			}}
			className={`material-symbols-${variant || "rounded"}`}
		>{icon}</IconSpan>
	);
}
