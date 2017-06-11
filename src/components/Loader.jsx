import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const LoadingState = () => (

      <Dimmer active inverted style={{height:'90vh'}} >
        <Loader inverted content='Loading' size='big'/>
      </Dimmer>

)

export default LoadingState;