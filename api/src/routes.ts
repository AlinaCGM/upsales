import express, { Request, Response } from 'express';

const router = express.Router();

let transactions: any[] = [];
let accounts: { [key: string]: { balance: number } } = {
  "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2": { balance: 100 },
  "5ae0ef78-e902-4c40-9f53-8cf910587312": { balance: 200 },
};

function updateBalance(accountId: string, amount: number) {
  if (!accounts[accountId]) {
    accounts[accountId] = { balance: 0 };
  }
  accounts[accountId].balance += amount;
}

router.post('/transaction', (req: Request, res: Response) => {
  const { account_id, amount } = req.body;
  if (!account_id || amount === undefined) {
    return res.status(400).json('Account ID and amount are required');
  }

  if (accounts[account_id] === undefined) {
    return res.status(404).json('Account not found');
  }

  if (accounts[account_id].balance + amount < 0) {
    return res.status(400).json('Insufficient funds');
  }

  const transaction = {
    transaction_id: `tran_${new Date().getTime()}`,
    account_id,
    amount,
    created_at: new Date().toISOString(),
  };

  updateBalance(account_id, amount);
  transactions.push(transaction);

  res.status(201).json(transaction);
});

router.get('/transactions', (req: Request, res: Response) => {
  res.status(200).json(transactions);
});

router.get('/balance', (req: Request, res: Response) => {
  if (transactions.length === 0) {
    return res.status(200).json({ account_id: 'N/A', balance: 0 });
  }
  const lastTransaction = transactions[transactions.length - 1];
  const balance = accounts[lastTransaction.account_id].balance;
  res.status(200).json({ account_id: lastTransaction.account_id, balance });
});

router.get('/account/:accountId/balance', (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  if (accounts[accountId]) {
    res.status(200).json({ account_id: accountId, balance: accounts[accountId].balance });
  } else {
    res.status(404).json({ message: "Account not found" });
  }
});

export default router;
