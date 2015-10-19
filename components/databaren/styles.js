import dconst from "../../data-constants.js";


export default {
    header: {
        backgroundColor: dconst.colors.background,
        fontFamily: 'Lato, Arial',
        height: 50,
    },
    widther: {
        maxWidth: dconst.site_width,
        margin: "auto",
        position: "relative"
    },
    button: {
        backgroundColor: dconst.colors.second,
        border: "none",
        fontSize: 14,
        height: 50,
        padding: "1px 0 0 0"
    },
    superdelta: {
        width: 50,
        display: "inline-block",
        textAlign: "center",
    },
    superdelta_img: {
        marginTop: 10,
        height: 31,
        marginLeft: 1.5
    },
    nav: {
        display: "inline-block",
        marginLeft: 9,
        verticalAlign: "top",
    },
    navelement: {
        display: "inline-block",
        fontSize: 15,
        textTransform: "uppercase",
        color: dconst.colors.offwhite,
        textDecoration: "none",
        padding: "17px 11px 16px 11px"
    },
    login: {
        width: 100,
        fontFamily: "Lato, Arial",
        textTransform: "uppercase",
    },
    leftside: {
        display: "inline-block",
        position: "absolute",
        right: 0
    }
}
