import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
`;

const BalanceCard = styled.div`
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
`;

const BalanceTitle = styled.div`
  font-size: 16px;
`;

const BalanceAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-top: 8px;
`;

const IncomeExpenseContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const SummaryBox = styled.div`
  flex: 1;
  padding: 15px;
  border-radius: 10px;
  background: white;
  border: 1px solid #e6e8e9;
  text-align: center;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
`;

const Amount = styled.div`
  margin-top: 10px;
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => (props.income ? "green" : "red")};
`;

const TransactionTitle = styled.h3`
  margin-bottom: 15px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: white;
  border-right: 6px solid
    ${(props) => (props.type === "INCOME" ? "green" : "red")};
  box-shadow: 0px 2px 5px rgba(0,0,0,0.08);
`;

const Description = styled.div`
  font-weight: 600;
`;

const TransactionAmount = styled.div`
  color: ${(props) => (props.type === "INCOME" ? "green" : "red")};
  font-weight: bold;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: gray;
  padding: 20px;
`;

const TransactionComponent = ({ transactions }) => {
  const income = transactions
    .filter((item) => item.type === "INCOME")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "EXPENSE")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;

  return (
    <Container>
      <SummaryContainer>
        <BalanceCard>
          <BalanceTitle>Current Balance</BalanceTitle>
          <BalanceAmount>₹ {balance}</BalanceAmount>
        </BalanceCard>

        <IncomeExpenseContainer>
          <SummaryBox>
            Income
            <Amount income>₹ {income}</Amount>
          </SummaryBox>

          <SummaryBox>
            Expense
            <Amount>₹ {expense}</Amount>
          </SummaryBox>
        </IncomeExpenseContainer>
      </SummaryContainer>

      <TransactionTitle>Transactions</TransactionTitle>

      {transactions.length === 0 ? (
        <EmptyMessage>No Transactions Added Yet</EmptyMessage>
      ) : (
        transactions.map((txn) => (
          <TransactionItem key={txn.id} type={txn.type}>
            <Description>{txn.desc}</Description>

            <TransactionAmount type={txn.type}>
              {txn.type === "INCOME" ? "+" : "-"} ₹ {txn.amount}
            </TransactionAmount>
          </TransactionItem>
        ))
      )}
    </Container>
  );
};

export default TransactionComponent;