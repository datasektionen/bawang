var React = require("react");


class Dataswitch extends React.Component {
    render() {
        return (<div className="language_select">
            <input type="radio" name="language" id="language" value="English" /> Engelska
            <input type="radio" name="language" id="language" value="Swedish" /> Svenska
        </div>)
    }
}

module.exports = Dataswitch;
