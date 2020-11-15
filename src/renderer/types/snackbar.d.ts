export interface Snackbar {
	open: (snackbarOptions: SnackbarOptions) => void;
}

export interface SnackbarOptions {
	type?: string;
	message?: string;
	position?: string;
	duration?: number;
	queue?: boolean;
	indefinite?: boolean;
	container?: string;
	actionText?: string | null;
	onAction?: () => void;
}

export enum SnackbarTypes {
	isWhite = "is-white",
	isBlack = "is-black",
	isLight = "is-light",
	isDark = "is-dark",
	isPrimary = "is-primary",
	isInfo = "is-info",
	isSuccess = "is-success",
	isWarning = "is-warning",
	isDanger = "is-danger"
}

export enum SnackbarPosition {
	isTopRight = "is-top-right",
	isTop = "is-top",
	isTopLeft = "is-top-left",
	isBottomRight = "is-bottom-right",
	isBottom = "is-bottom",
	isBottomLeft = "is-bottom-left"
}