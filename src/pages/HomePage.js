import React from 'react';
import HomeContainer from '../module/Auth/component/HomeContainer';
import Report from '../components/ReportList';
import AddReport from '../components/AddReport';

import {
  Route
} from 'react-router-dom'

function HomePage(props){  
    console.log(props);
    return(
      <div>
        <HomeContainer />
        <Route path={`${props.match.url}/report`} component={Report}/>
        <Route path={`${props.match.url}/addReport`} component={AddReport}/>
      </div>
    )
}

export default HomePage;