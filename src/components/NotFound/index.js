import React from 'react'
export default function NotFound(props) {
  return [<header key="header">
    <div className="header-inner">
      <div className="row">
        <div className="header-left col-md-2">
          <a href="/">&laquo; Tillbaka</a>
        </div>
        <div className="col-md-8">
          <h2>{props.status}</h2>
        </div>
        <div className="header-right col-md-2"></div>
      </div>
      <div className="clear"></div>
    </div>
  </header>,
  <div id="content" key="content">
    <div className="text-center" style={{padding: '50px'}}>
      <h2>Innehållet du sökte hittades inte</h2>
      <br />
      <h4>Kanske stavade du fel i adressen, eller så har innehållet flyttat.</h4>
    </div>
  </div>]
}
