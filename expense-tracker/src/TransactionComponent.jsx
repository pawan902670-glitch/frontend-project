import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Item = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const TransactionComponent = ({ transactions }) => {
  return (
    <Container>
      <h3>Transactions</h3>

      {transactions.map((txn) => (
        <Item key={txn.id}>
          {txn.desc} - ₹{txn.amount} ({txn.type})
        </Item>
      ))}
    </Container>
  );
};

export default TransactionComponent;