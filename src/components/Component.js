import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ExpenseContext from "../contexts/ExpenseContext";

const Component = () => {
  const inputRef = useRef(null);
  const [newExpense, setNewExpense] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  const [expenses, setExpenses] = useState([]);

  const { total, setTotal } = useContext(ExpenseContext);

  useEffect(() => {
    if (expenses.length === 0) {
      setTotal({
        price: 0,
        quantity: 0,
      });
      return;
    }
    const newValues = expenses.reduce(
      (acc, cur) => {
        return {
          price: acc.price + cur.price * cur.quantity,
          quantity: acc.quantity + cur.quantity,
        };
      },
      {
        price: 0,
        quantity: 0,
      }
    );
    setTotal(newValues);
  }, [expenses]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (["price", "quantity"].includes(name)) value = parseInt(value);
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDeafualt();
    setExpenses((prev) => [newExpense, ...prev]);
    setNewExpense({
      name: "",
      price: 0,
      quantity: 0,
    });
    inputRef.current.focus();
  };
  return (
    <div className="content">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                onChange={handleChange}
                value={newExpense.name}
                name="name"
                className="input is-success"
                type="text"
                placeholder="Enter expense name"
              />
              <input
                onChange={handleChange}
                value={newExpense.price}
                name="price"
                className="input is-success"
                type="number"
                placeholder="Enter expense price"
              />
              <input
                onChange={handleChange}
                value={newExpense.quantity}
                name="quantity"
                className="input is-success"
                type="number"
                placeholder="Enter expense number"
              />
              <button className="button is-info is-focused">
                Add new expense{" "}
              </button>{" "}
            </form>
          </div>
        </div>
      </div>
      {expenses.map((expense, index) => {
        return (
          <div className="card" key={`expense-${index}`}>
            <div className="card-content">
              <div className="content">
                <h1 className="title"> {expense.name}</h1>
                <p className="subtitle"> {expense.price}₩ </p>
                <p className="subtitle"> Quantity: {expense.quantity} </p>
                <p className="subtitle">
                  {" "}
                  % of total:{" "}
                  {Math.floor(expense.quantity * expense.price) /
                    total.price}{" "}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Component;
