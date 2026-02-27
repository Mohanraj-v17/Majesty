

import { useSelector,useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import {toggletheme}  from "../slices/themeSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout as logoutAction } from "../slices/authSlice";





 

const Header = () => {

  const {cartItem} = useSelector((state) => state.cart);
  const {userInfo}  = useSelector((state) => state.auth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();
  const {mode} = useSelector((state) => (state.theme))

  const themeEvent = (mode) => {
     dispatch( toggletheme(mode))
  }

 

  const logoutHandler= async () =>  {
    try{
        await logoutApiCall().unwrap();
        dispatch(logoutAction());
        navigate("/login");
    }catch(error){
         console.log(error)
    }
  }
  
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Majesty</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link to="/cart">
        Cart
        <span>
          {cartItem.length > 0 ? cartItem.length : 0}
        </span>
      </Link>
      </li>
       
        {userInfo ? (
           <li>
          <details>
          <summary>{userInfo.name}</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li onClick={() => themeEvent(mode)}>  <a>{mode === "dark" ? "light" : "dark"}</a></li>
            <li><Link to={"/profile"}>Profile</Link></li>
            
            <li onClick={logoutHandler}><a>logout</a></li>
            
          </ul>
        </details>  </li> ): (<li>
          <Link to={"/login"}>
          Sign in</Link>
        </li>) 
         }
    </ul>
  </div>
</div>
  )
}

export default Header