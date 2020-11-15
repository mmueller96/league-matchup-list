export interface RoomListItem {
	roomName: string;
	roomID: string;
	admin: number;
}

export interface RoomListItemFromFetch {
	CreatedAt: string;
	DeletedAt?: string;
	RelatedUserID: number;
	UpdatedAt: string;
	id: string;
	roomName: string;
}