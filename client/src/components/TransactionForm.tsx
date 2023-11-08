import React, { useState } from 'react';


type TransactionFormProps = {
  onSubmit: (accountId: string, amount: number) => void;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(accountId, amount);
    setAccountId('');
    setAmount(0);
  };

  return (
    <div className='container mt-5'>
    <form onSubmit={handleSubmit} >
    <div className='mb-2'> <input
        type="text"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder="Account ID"
        required
      /></div> 
     <div className='mb-2'><input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        required
      /></div> 
      <button type="submit">Submit Transaction</button>
    </form>
    </div>
  );
};

export default TransactionForm;

