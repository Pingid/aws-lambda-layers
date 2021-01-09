import type { Serverless } from "serverless/aws";
const packageJson = require("./package.json");

const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default ({
  name,
  region,
  stage,
}: {
  region: string;
  stage: string;
  name: string;
}): Serverless => ({
  service: `${name}-layer`,
  frameworkVersion: packageJson.devDependencies.serverless,
  custom: {
    region: "${opt:stage, 'eu-west-2'}",
    output: {
      file: `../../${name}-stack.json`,
    },
  },
  provider: {
    name: "aws",
    region: "${self:custom.region}",
    stage: "${opt:stage, 'dev'}",
  },
  layers: {
    [name]: {
      path: "layer",
    },
  },
  plugins: [require.resolve("serverless-stack-output")],
  resources: {
    Resources: {},
    Outputs: {
      FfmpegLayerExport: {
        Value: {
          Ref: `${capitalize(name)}LambdaLayer`,
        },
        Export: {
          Name: `${capitalize(name)}LambdaLayer`,
        },
      },
    },
  },
});
