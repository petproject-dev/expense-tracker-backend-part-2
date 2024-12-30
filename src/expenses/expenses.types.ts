export type CreateExpenseType = {
	amount: number;
	currency: 'USD' | 'EUR';
	description?: string;
	category: string;
};
