import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './../../../views/Home'
import Members from './../../../views/Members'
import { useHistory } from "react-router-dom";

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  function HomeButton() {
    const history = useHistory();
    console.log(history.location.pathname)
  
    function handleClick() {
      history.push("/");
    }
    if(history.location.pathname==="/members"){
    return (
      
      <Link type="button" onClick={()=>history.push("/")}>
        Home
      </Link>
    );
  }
  return (
      
    <Link type="button" onClick={()=>history.push("/members")}>
      About us
    </Link>
  );
  
}
  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        
        <li>
        <HomeButton/>
        </li>
       
      </ul>
    </nav>
  );
}

export default FooterNav;