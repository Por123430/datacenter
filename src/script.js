import EmbedSDK from "@mongodb-js/charts-embed-dom";

const sdk = new EmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-arduinoproject-dvaqg",
});

const chart = sdk.createChart({
    chartId: "640ae2c8-554b-4e75-8309-0508f9355ce1",
    width: 640,
    height: 400,
    theme: "dark",
});
chart.render(document.getElementById("chart"));