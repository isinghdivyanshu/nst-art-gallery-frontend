export interface Artist {
	_id: string;
	name: string;
}

export interface Art {
	likedByUser: boolean;
	_id: string;
	title: string;
	description: string;
	image: string;
	artist: Artist;
	likes: number;
	slug: string;
	createdAt: string;
	published: boolean;
}
