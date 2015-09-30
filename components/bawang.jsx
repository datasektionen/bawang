var React = require("react");
var Databaren = require("./Databaren.jsx");


class Bawang extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="./node_modules/normalize.css/normalize.css" type="text/css" />
                    <title>Konlig Datasektionen vid KTH</title>
                </head>
                <body>
                    <Databaren />
                    <div className="background">
                        <img className="left" src="left.jpg" />
                        <img className="right" src="right.jpg" />
                    </div>
                    <section className="top">
                        <img alt="Datasektionens sköld" src="img/sköld.svg" />
                        <h1>Konglig Data<span className="invert">sektionen<span className="small">vid KTH</span></span></h1>
                        <div className="right">
                            <article className="half bold">
                                Datasektionen är en ideel studentsektion under Tekniska Högskolans Studentkår som finns till för att alla som läser Datateknik på KTH ska få en så bra och givande studietid som möjligt.
                            </article>
                            <article className="half">
                                På Konglig Datasektionen finns det många sätt att roa sig. Förutom studier i intressanta ämnen och episka fester anordnas det även qulturella tillställningar, hackerkvällar, sektionsmöten och mycket mer.
                            </article>
                        </div>
                        <data-news className="right" />
                    </section>
                    <script src="bundle.js"></script>
                </body>
            </html>
        );
    }
}

if(process.browser) {
    React.render(<Bawang />, document);
}

module.exports = Bawang;
