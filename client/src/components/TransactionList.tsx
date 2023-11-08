import React from 'react';

type TransactionListProps = {
  transactions: {
    transaction_id: string;
    account_id: string;
    amount: number;
    created_at: string;
  }[];
  balance: number;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, balance }) => {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    // Format the date as desired, for example: YYYY-MM-DD HH:MM:SS
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className='bg-light '>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction) => (
          <li className='border border-secondary mb-1 py-5 list-unstyled' key={transaction.transaction_id}>
            Transfered $ {transaction.amount} (Account: {transaction.account_id}) 
            <p>Date of transaction {formatDate(transaction.created_at)}</p>
          </li>
        ))}
      </ul>
      <h3>Current Balance: {balance}$</h3>
    </div>
  );
};

export default TransactionList;

