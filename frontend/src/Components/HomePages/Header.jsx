import { useContext, useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import '../../Styles/Header.css'
export default function Header() {

  
  return (
    <header>
      <Link to="/" className="logo">
        CONNECTIFY
      </Link>
    </header>
  );
}