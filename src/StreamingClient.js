// import signalr from '@microsoft/signalr';
const signalr = require('@microsoft/signalr')

const token = "eyJhbGciOiJFUzI1NiIsIng1dCI6IjI2MEI5NDNDRTMyN0EyQTgyN0RDNjk5OTU5ODAxMDE5OTRCOTcyRDkifQ.eyJvYWEiOiI3Nzc3NyIsImlzcyI6Im9hIiwiYWlkIjoiNDc0IiwidWlkIjoiSHw3WFRzZVY2N2VpcVlsfGZObmQ4UT09IiwiY2lkIjoiSHw3WFRzZVY2N2VpcVlsfGZObmQ4UT09IiwiaXNhIjoiVHJ1ZSIsInRpZCI6IjIwMDIiLCJzaWQiOiIxOTkxOWYzYjZmZWM0MTY1YWIyNjk4OGRlN2JhZTRhYiIsImRnaSI6IjgyIiwiZXhwIjoiMTYyNDkwMzcyOSIsIm9hbCI6IjFGIn0.r0YuvJZBuPdX9tVDbkbtOk0r1ykISIxJBOY3OTzgKhTcWsDal7S5JfDxaoEVpMvrDtCZqv8j30zSEnnDa-vrZg";
const streamingServerUrl = "https://tst211.openapi.one.eu41t.inf.iitech.dk/oapi/streaming";
const contextId = `context-id-${Math.random()}`;

let pricingConnection ;

function onSuccess(message){
  console.log("Connected to server...",message);
}

function showMessage(message){
  console.log(message);
}

const creatConnection = async () => {
  pricingConnection = new signalr.HubConnectionBuilder()
    .withUrl(`${streamingServerUrl}?contextId=${contextId}`, { accessTokenFactory: () => token })
    .build();
  try{
    await pricingConnection.start();
    console.log("Starting...");
    pricingConnection.stream("StartStreaming")
      .subscribe({
        next: onSuccess,
        error: showMessage,
      });
  }catch(err){
    showMessage("Failed to connect to server" + err.toString());
  }
}

module.exports = {creatConnection}
