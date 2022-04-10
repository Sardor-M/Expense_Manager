import { useContext } from "react";
import expenseContext from "../contexts/expenseContext";

const Footer = () => {
  const { total } = useContext(expenseContext);
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Total Price is </strong> ₩{total.price}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
