var React = require("react");
var Radium = require("radium");
var dconst = require("../../data-constants.js");


class Dataswitch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        };
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        });
        this.props.onChange(e.target.value);
    }
    render() {
        var styles = {
            base: {
                display: "inline-block",
                color: dconst.colors.offwhite,
                margin: 10,
                backgroundColor: "#333",
                borderRadius: 2,
                textTransform: "uppercase",
            },
            label: {
                cursor: "pointer",
                fontSize: 11.3,
                paddingLeft: 19,
                paddingRight: 19,
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
            <form onChange={this.onChange.bind(this)} style={styles.base}>
                {this.props.alternatives.map(function(alternative, i) {
                    return (
                        <label key={alternative} style={[styles.label, that.state.value == that.props.values[i] && styles.checked]}>
                            <input
                                style={styles.input}
                                type="radio"
                                name="language" 
                                value={that.props.values[i]}
                            />
                            {alternative}
                        </label>
                )})}
            </form>
        );
    }
}

export default Radium(Dataswitch);
