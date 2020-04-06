import React from 'react';
import * as authToken  from "../utility/authTokenHandler";
import { Route , Redirect} from "react-router-dom";


export default function PrivateRoute({ children, ...rest }) {
    let isLogin  = false;
    if(authToken.get() === ''){
        isLogin = false;
    }else{
        isLogin = true;
    }

    return (
      <Route {...rest} render={({ location }) =>
          isLogin ? ( 
              children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}/>
            )
        }/>);
  }