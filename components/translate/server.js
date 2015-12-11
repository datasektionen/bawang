// Identifices the what language to send to the client, looking at cookies and accept-header
// Takes express res and req
export function server_setup(res, req) {
    if(req.cookies.language) {
        var lang = req.cookies.language;
    } else {
        // Set language cookie based on browser setting. Prefer Swedish default to English;
        var lang = req.acceptsLanguages(["sv", "en"]);
        if(!lang) {
            lang = "en";
        }
        res.cookie("language", lang, {
            maxAge: 9000000000
        });
    } 
    return lang;
}
