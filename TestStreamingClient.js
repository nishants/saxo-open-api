const signalR = require('@microsoft/signalr')

const start = () => {
  let pricingConnection ;

  const showMessage = (content) => {
    console.log('message : ', content)
  };

  const subscribeToListener = async () => {
    pricingConnection.stream("StartStreaming")
      .subscribe({
        next: showMessage,
        error: showMessage,
      });
  };


  const creatConnection = async ({token, onSuccess, streamingServerUrl, contextId }) => {
    pricingConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${streamingServerUrl}?contextId=${contextId}`, { accessTokenFactory: () => token })
      .build();
    try{
      await pricingConnection.start();
      showMessage("Conncted with server");
      await subscribeToListener();
      onSuccess();
    }catch(err){
      showMessage("Failed to connect to server" + err.toString());
    }
  }

  const stop = async () => {
    await pricingConnection.stop();
  }

  function connect(){
    const token = '';
    const contextId = '';
    const streamingServerUrl = '';

    creatConnection({token, contextId, streamingServerUrl, onSuccess: () => updateUi({connected: true})});
  }

  function disconnect (){
    stop().then(() => console.log("Disconnected"));
  }

  connect();

  setTimeout(10000, () => {
    console.log("Trying to disconnect");
    disconnect();
  })
}

start();
