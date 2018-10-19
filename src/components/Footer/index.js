import {Fragment} from "react";
import React from "react";

export default () => <Fragment>
  <div id="footer" className="row">
    <div className="col-sm-6 col-md-3" id="contact">
      <p>&nbsp;</p>
      <p>
        <strong>Adress</strong>
      </p>
      <p>
        Konglig Datasektionen<br />
        Fack vid THS<br />
        100 44 Stockholm
      </p>
      <p>
        <strong>Organisationsnummer</strong>
      </p>
      <p>802412 - 7709</p>
      <p>
        <a className="action" href="/kontakt">Kontakt</a>
      </p>
    </div>
    <div className="col-sm-6 col-md-9" id="map">
      <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.0958020405822!2d18.069220116002757!3d59.348048616563695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6a99ea1e8d%3A0x8637b28fa239bfcb!2sOsquars+backe+21%2C+114+28+Stockholm!5e0!3m2!1sen!2sse!4v1463425310266" width="100%" height="300" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
    </div>
  </div>
</Fragment>
