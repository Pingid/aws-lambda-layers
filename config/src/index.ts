import type { Serverless } from "serverless/aws";
const packageJson = require("../package.json");

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
    output: {
      file: `../../${name}-stack.json`,
    },
  },
  provider: {
    name: "aws",
    region,
    stage,
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
      [`${capitalize(name)}LayerExport`]: {
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
