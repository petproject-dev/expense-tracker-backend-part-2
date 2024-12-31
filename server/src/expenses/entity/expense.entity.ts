type Currency = 'USD' | 'EUR'

export type Expense = {
	id: number;
	name: string;
	amount: number;
	currency: Currency;
	date: Date;
	category: string;
	createdAt: Date;
	updatedAt: Date;
};
