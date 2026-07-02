import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const BalanceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px 12px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  input {
    padding: 10px;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const SummaryBox = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  padding: 15px;
`;

const OverviewComponent = ({ transactions, addTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;

  const handleAdd = () => {
    if (!amount || !desc) return;

    addTransaction({
      id: Date.now(),
      amount: Number(amount),
      desc,
      type,
    });

    setAmount("");
    setDesc("");
    setType("EXPENSE");
    setShowForm(false);
  };

  return (
    <Container>
      <BalanceBox>
        <span>Balance: ₹{balance}</span>

        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add"}
        </Button>
      </BalanceBox>

      {showForm && (
        <FormContainer>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div>
            <input
              type="radio"
              name="type"
              value="EXPENSE"
              checked={type === "EXPENSE"}
              onChange={(e) => setType(e.target.value)}
            />
            Expense

            <input
              type="radio"
              name="type"
              value="INCOME"
              checked={type === "INCOME"}
              onChange={(e) => setType(e.target.value)}
            />
            Income
          </div>

          <Button onClick={handleAdd}>
            Add Transaction
          </Button>
        </FormContainer>
      )}

      <SummaryContainer>
        <SummaryBox>
          Expense
          <h3>₹{expense}</h3>
        </SummaryBox>

        <SummaryBox>
          Income
          <h3>₹{income}</h3>
        </SummaryBox>
      </SummaryContainer>
    </Container>
  );
};

export default OverviewComponent;