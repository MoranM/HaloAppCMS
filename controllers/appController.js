exports.protocolDetails = function (req, res) {
    return res.json({
        appVersion: "0.0.1",
        imageUrlPrefix: "http://haloapp-22077.onmodulus.net/"
    });
};