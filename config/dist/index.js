"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packageJson = require("./package.json");
var capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.default = (function (_a) {
    var _b;
    var name = _a.name, region = _a.region, stage = _a.stage;
    return ({
        service: name + "-layer",
        frameworkVersion: packageJson.devDependencies.serverless,
        custom: {
            region: "${opt:stage, 'eu-west-2'}",
            output: {
                file: "../../" + name + "-stack.json",
            },
        },
        provider: {
            name: "aws",
            region: "${self:custom.region}",
            stage: "${opt:stage, 'dev'}",
        },
        layers: (_b = {},
            _b[name] = {
                path: "layer",
            },
            _b),
        plugins: [require.resolve("serverless-stack-output")],
        resources: {
            Resources: {},
            Outputs: {
                FfmpegLayerExport: {
                    Value: {
                        Ref: capitalize(name) + "LambdaLayer",
                    },
                    Export: {
                        Name: capitalize(name) + "LambdaLayer",
                    },
                },
            },
        },
    });
});
