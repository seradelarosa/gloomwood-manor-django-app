import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <h1>Gloomwood Manor</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/requests-list">Requests</Link>
        <Link to="/guests-list">Guests</Link>
        <Link to="/ghosts-list">Ghosts</Link>
      </nav>
    </>
  );
};

export default Navbar;
