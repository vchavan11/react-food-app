import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-Contex";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [checkout, isCheckout] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [didSubmit, setDidsubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const clickHandler = () => {
    isCheckout(true);
  };

  const submitOrder = async (userData) => {
    // console.log(userData);
    setSubmit(true);
    await fetch(
      "https://react-food-app-f4313-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmit(false);
    setDidsubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={clickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <CheckOut onConfirm={submitOrder} onCancel={props.onHideCart} />
      )}
      {!checkout && modalActions}
    </>
  );

  const isSubmitting = <p>Placing Your Order !</p>;
  const didSubmitContent = (
    <>
      <p style={{ color: "green" }}>Order Placed Successfully ! </p>{" "}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {!submit && !didSubmit && cartContent}
      {submit && isSubmitting}
      {!submit && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
