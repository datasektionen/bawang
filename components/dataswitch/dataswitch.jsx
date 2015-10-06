var React = require("react");
var Radium = require("radium");
var dcolors = require("../../data-colors.js");


class Dataswitch extends React.Component {
    render() {
        var styles = {
            base: {
                display: "inline-block",
                color: dcolors.offwhite,
                margin: 10,
                backgroundColor: "#333",
                borderRadius: 2,
                textTransform: "uppercase"
            },
            label: {
                cursor: "pointer",
                fontSize: 11.3,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8.5,
                paddingBottom: 8.5,
                display: "inline-block",
            },
            checked: {
                backgroundColor: "#e1e1e1",
                color: "#333",
                fontWeight: "bold",
                borderRadius: 2
            },
            input: {
                display: "none",
            }
        };
        var that = this;
        return (
            <div style={styles.base} className="language_select">
                {this.props.alternatives.map(function(alternative) {
                    return (
                        <label key={alternative} style={[styles.label, that.props.value == alternative && styles.checked]}>
                            <input style={styles.input} type="radio" name="language" id={alternative} value={alternative} defaultChecked={that.props.value == alternative} />
                            {alternative}
                        </label>
                )})}
            </div>
        );
    }
}

module.exports = Radium(Dataswitch);
