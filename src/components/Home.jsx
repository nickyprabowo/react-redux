import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import HeaderContainer from '../module/Auth/component/HeaderContainer';
import Sidebar from './Sidebar';
import AddReport from './AddReport';
import ReportList from './ReportList';
import {Route, Redirect} from 'react-router-dom';

var page = null;

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.getAuthStatus();
        
    }

    render() {
        
        if(this.props.match.url=='/home/report'){

            page = <Redirect to={`${this.props.match.url}/report`} />;

        }else{

            page = null;

        }; 

        return (
            
            <div>

                <HeaderContainer/>
                <Grid>      
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Sidebar {...this.props}/>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <div className='main-content'>
                                
                               <Route path={`${this.props.match.url}/report`} component={()=>(<ReportList {...this.props}/>)} />
                               <Route path={`${this.props.match.url}/addReport`} component={()=>(<AddReport {...this.props}/>)} />
                                
                               {page}

                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Home;
