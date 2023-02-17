# FME Activities

[![CI/CD](https://github.com/vertigis/workflow-activities-fme/workflows/CI/CD/badge.svg)](https://github.com/vertigis/workflow-activities-fme/actions)
[![npm](https://img.shields.io/npm/v/@vertigis/workflow-activities-fme)](https://www.npmjs.com/package/@vertigis/workflow-activities-fme)

This project contains activities for interacting with the [FME Server REST API](https://docs.safe.com/fme/html/FME_REST/apidoc/v3/) in a [VertiGIS Studio Workflow](https://www.vertigisstudio.com/products/vertigis-studio-workflow/).

This project uses `FMEServer.js` provided by [FME](https://playground.fmeserver.com/javascript/javascript-library/get-the-library/).

## Requirements

### VertiGIS Studio Workflow Versions

The FME activities are designed to work with VertiGIS Studio Workflow versions `5.20` and above.

### FME Versions

The FME activities are designed to work with FME Server REST API `V3`.

## Usage

To use the FME activities in [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/) you need to register an activity pack and then add the activities to a workflow.

### Register the FME activity pack

1. Sign in to ArcGIS Online or Portal for ArcGIS
1. Go to **My Content**
1. Select **Add Item > An application**
    - Type: `Web Mapping`
    - Purpose: `Ready To Use`
    - API: `JavaScript`
    - URL: The URL to this activity pack manifest
        - Use https://unpkg.com/@vertigis/workflow-activities-fme/activitypack.json for the latest version
        - Use https://unpkg.com/@vertigis/workflow-activities-fme@3.0.0/activitypack.json for a specific version
        - Use https://localhost:5000/activitypack.json for a local development version
    - Title: Your desired title
    - Tags: Must include `geocortex-workflow-activity-pack`
1. Reload [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/)
1. The FME activities will now appear in the activity toolbox in a `FME` category

### Use the FME activities in a workflow

1. Establish a connection to the FME service
    1. Add the `Create FME Service` activity to a workflow
    1. Set the `URL` input to the root URL of your FME server. For example, `https://demos-safe-software.fmecloud.com`.
    1. If you have an existing FME access token, assign it to the `Token` input
    1. If you have a username and password, assign them to the `Username` and `Password` inputs
    - **IMPORTANT:** tokens and passwords are credentials that should not be hard coded into workflows. These values should be acquired by the workflow at runtime from the end user or from another secure system.
1. Use the FME service
    1. Add one of the other FME activities to the workflow. For example, `Run FME Job`.
    1. Set the `Service` input of the activity to be the output of the `Create FME Service` activity
        - Typically this would use an expression like `=$fmeService1.service`
    1. Supply any additional inputs to the activity
    1. Supply the `result` output of the activity to the inputs of other activities in the workflow
1. Run the workflow

## Development

This project was bootstrapped with the [VertiGIS Studio Workflow SDK](https://github.com/vertigis/vertigis-workflow-sdk). Before you can use your activity pack in the [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/), you will need to [register the activity pack](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview#register-the-activity-pack).

## Available Scripts

Inside the newly created project, you can run some built-in commands:

### `npm run generate`

Interactively generate a new activity or form element.

### `npm start`

Runs the project in development mode. Your activity pack will be available at [http://localhost:5000/main.js](http://localhost:5000/main.js). The HTTPS certificate of the development server is a self-signed certificate that web browsers will warn about. To work around this open [`https://localhost:5000/main.js`](https://localhost:5000/main.js) in a web browser and allow the invalid certificate as an exception. For creating a locally-trusted HTTPS certificate see the [Configuring a HTTPS Certificate](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview/#configuring-a-https-certificate) section on the [VertiGIS Studio Developer Center](https://developers.vertigisstudio.com/docs/workflow/overview/).

### `npm run build`

Builds the activity pack for production to the `build` folder. It optimizes the build for the best performance.

Your custom activity pack is now ready to be deployed!

See the [section about deployment](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview/#deployment) in the [VertiGIS Studio Developer Center](https://developers.vertigisstudio.com/docs/workflow/overview/) for more information.

## Documentation

Find [further documentation on the SDK](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview/) on the [VertiGIS Studio Developer Center](https://developers.vertigisstudio.com/docs/workflow/overview/)
