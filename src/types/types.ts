export type User = {
	account: Account | null;
	accessToken: string | null;
};

export type Account = {
	id: number;
	username: string;
	cosmetics: {
		capes: StoreItemType[];
		wings: StoreItemType[];
		icons: StoreItemType[];
		bandanas: StoreItemType[];
		hats: StoreItemType[];
		shields: StoreItemType[];
	};
	selected_cape?: number;
	selected_wings?: number;
	is_admin: boolean;
	remember_me_token?: any;
	created_at: string;
	updated_at: string;
	original_username: string;
	email: string;
	selected_icon?: number;
	is_online: boolean;
	last_online?: string;
	is_plus: boolean;
	plus_expiration?: string;
	overvall_playtime: number;
	discord_id?: number;
	telegram_id?: number;
	custom_skin: boolean;
	skin_type: string;
	is_partner: boolean;
	partner_balance: number;
	is_banned: boolean;
	last_update?: string;
	selected_bandana: number;
	selected_shield: number;
	cape_type: string;
	cape_shoulders: number;
	is_tester: boolean;
	is_staff: boolean;
	current_server?: string;
	last_skin_update?: string;
	is_bot: boolean;
	is_dev: boolean;
	is_retired?: boolean;
	show_cosmetics?: boolean;
	show_cosmetics_to_friends?: boolean;
	show_stats: boolean;
	show_stats_to_friends?: boolean;
	show_current_server?: boolean;
	show_current_server_to_friends?: boolean;
	selected_hat?: number;
	is_premium_plus: boolean;
	bandana_color?: number;
	is_manager: boolean;
	is_tester_manager: boolean;
	is_senior_tester: boolean;
	available_giveaways: number;
	gived_giveaways: number;
	two_stage_auth: boolean;
	vk_id?: number;
};

export type StoreItemType = {
	id: number;
	texture: string;
	name: string;
	price: number;
	sale_price: number;
	normal_price: number;
	category: string;
	preview: string;
	created_at: string;
	updated_at: string;
	is_private?: number;
	partner_id?: number;
};

export interface MarketplaceItem {
	type: string;
	id: number;
	name: string;
	preview: string;
	count: number;
	min_price: number;
	last_listed: string;
	last_sold: string | null;
	last_seller: string | null;
}

export interface ItemPageType {
	item: StoreItemType;
	lots: ExtendedMarketplaceItem[];
	orders: OrderItem[];
}

export interface OrderItem {
	user: Account;
	item: StoreItemType;
	id: number;
	user_id: number;
	item_id: number;
	item_type: string;
	max_price: number;
	created_at: string;
	updated_at: string;
}

export interface ExtendedMarketplaceItem {
	user: Account;
	item: StoreItemType;
	id: number;
	user_id: number;
	item_id: number;
	item_type: string;
	price: number;
	status: string;
	created_at: string;
	updated_at: string;
}

export interface SaleType {
	date: string;
	prices: number[];
	median_price: number;
}

export interface DealType {
	lot: ExtendedMarketplaceItem;
	id: number;
	user_id: number;
	lot_id: number;
	status: string;
	created_at: string;
	updated_at: string;
	readed: boolean;
}
