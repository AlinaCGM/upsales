import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(100);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3000/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:3000/balance');
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        throw Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const submitTransaction = async (accountId: string, amount: number) => {
    try {
      const response = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: accountId, amount }),
      });
  
      if (response.ok) {
        fetchTransactions();
        fetchBalance();
      } else {
        console.error('Transaction submission failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, []);

  return (
    <div className="px-5">
      <h1>Financial Transactions</h1>
      <div className='row'>
        <div className='col'>
          <TransactionForm onSubmit={submitTransaction} />
        </div>
        <div className='col'>
          <TransactionList transactions={transactions} balance={balance} />
        </div>
      </div>
    </div>
  );
}

export default Home;
