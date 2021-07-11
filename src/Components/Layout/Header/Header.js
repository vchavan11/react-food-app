import React from "react";
import "./Header.module.css";
import mealImage from "../../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="delcious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
