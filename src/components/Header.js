import { useContext } from "react";
import expenseContext from "../contexts/expenseContext";

const Header = () => {
  const { total } = useContext(expenseContext);
  return (
    <section className="hero is-danger">
      <div className="hero-body">
        <p className="title">Total price is </p>
        <p className="subtitle">₩{total.price}</p>
      </div>
    </section>
  );
};
export default Header;
