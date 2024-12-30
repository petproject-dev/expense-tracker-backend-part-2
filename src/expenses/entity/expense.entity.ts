export type Expense = {
	id: number;
	amount: number;
	currency: 'USD' | 'EUR';
	description?: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;
};
