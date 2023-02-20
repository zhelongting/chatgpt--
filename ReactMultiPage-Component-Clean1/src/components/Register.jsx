import React, {Component} from 'react';
import './css/index.css';

class register extends Components{
    render(){
        return(
            <div id="loginDiv">
        <form action="">
            <h1>注 册</h1>
            <p>用户姓名:<input id="userNname" type="text" autofocus required/><label id="name_trip"></label></p>
 
            <p>用户密码:<input id="password" type="password" required/><label id="password_trip"></label></p>
 
            <p>确认密码:<input id="surePassword" type="password" required/><label id="surePassword_trip"></label></p>
        </form>
    </div>
   
);
}
}


export default Register;