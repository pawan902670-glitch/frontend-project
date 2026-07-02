import { useState } from "react";
import styled from "styled-components";
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
  width: 360px;
  font-family: sans-serif;
`;

const HomeComponent = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (payload) => {
    setTransactions((prev) => [...prev, payload]);
  };

  return (
    <Container>
      <OverviewComponent
        transactions={transactions}
        addTransaction={addTransaction}
      />

      <TransactionComponent
        transactions={transactions}
      />
    </Container>
  );
};

export default HomeComponent;