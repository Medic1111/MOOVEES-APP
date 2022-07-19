import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>Moovees</h1>
      <button className={classes.logOut}>Log out</button>
    </header>
  );
};

export default Header;
