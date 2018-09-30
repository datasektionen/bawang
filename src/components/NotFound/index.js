import React, { Fragment } from 'react'
import { Title } from 'react-head'
export const NotFound = (props) =>
<Fragment>
  <Title>
    { props.status + ' - Kongling Datasektionen' }
  </Title>
  <header key="header">
    <div className="header-inner">
      <div className="row">
        <div className="header-left col-md-2"></div>
        <div className="col-md-8">
          <h2>{props.status}</h2>
        </div>
        <div className="header-right col-md-2"></div>
      </div>
      <div className="clear"></div>
    </div>
  </header>
  <div id="content" key="content">
    <div className="text-center" style={{padding: '50px'}}>
      <h2>Innehållet du sökte hittades inte</h2>
      <br />
      <h4>Kanske stavade du fel i adressen, eller så har innehållet flyttat.</h4>
    </div>
  </div>
</Fragment>

export default NotFound
