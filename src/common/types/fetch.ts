interface fetchProps {
	baseUrl: string;
	token?: string;
	tokenHeaderKey?: 'X-AUTH-TOKEN' | 'Authorization';
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: unknown;
}

export type {
	fetchProps,
};
