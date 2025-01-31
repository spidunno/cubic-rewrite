import { PropsOf } from "@emotion/react";
import { Button, IconButton, styled } from "@mui/joy";
import { Link, To } from "react-router";

type NavButtonProps = PropsOf<typeof IconButton> & {
	to: To;
	iconButton?: boolean;
	viewTransition?: boolean;
	icon?: React.ReactNode;
};

const ButtonLink = styled(Button)(() => ({ textDecoration: "none" }));

export default function NavButton(props: NavButtonProps) {
	const { iconButton, icon, children, sx, ...propsWithoutOther } = props;
	return (
		<ButtonLink
			{...propsWithoutOther}
			sx={{ justifyContent: "start", overflow: "hidden", paddingLeft: '16px' }}

			//@ts-expect-error
			component={Link}
			startDecorator={icon}
			slotProps={{
				startDecorator: { sx: { fontSize: `calc(1.125rem / 1.571)` } },
			}}
		>
			{children}
		</ButtonLink>
	);
}
