import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../module/Auth/action';
import LoginPage from '../pages/LoginPage';
import HomeContainer from '../module/Auth/component/HomeContainer';
import {saveCred} from '../module/localStorage';
import store from '../store.js';

function mapStateToProps(state) {
  const { auth } = state;

  if(auth.isLoggedIn){
    saveCred(auth);
  };

  return {
    ...auth,
    position: 'Dashboard'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class Dashboard extends Component {

  componentWillMount() {
    this.props.getAuthStatus();
  }

  render(){
    //entah kenapa kalo akses props nilainyag cocok, harus akses langsung ke store
   var redirect = null;

   if(store.getState().auth.isLoggedIn===true){
    redirect = <Redirect to='/home/report' />;
   }else{
    redirect = <Redirect to='/login' />;
   }
   
    return(

        <div>

          <Route path='/login' component={LoginPage}/>
          <Route path='/home' component={HomeContainer}/>

          {  redirect }
            
        </div>
    )
  }
  
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
