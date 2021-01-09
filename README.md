# AWS Lmabda layers

A few usefull layers

Includes:

- ffmpeg
- puppeteer

Once deployed to your aws account the layers can be referenced from within a serverless config. For example to include puppeter you would add `layers: ['${cf:puppeteer-layer-prod.ChromeLayerExport}']` to the function config.
