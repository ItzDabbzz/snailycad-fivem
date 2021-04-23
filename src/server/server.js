/// <reference path="../../node_modules/@citizenfx/server/natives_server.d.ts" />
let cadfetch = require('./cadfetch.js')
let wraithLastPlates = { scanned: {}, locked: {} };
// eslint-disable-next-line no-unused-vars


onNet("sn:towCallUpdate", ({ street, name, description }) => {
  cadfetch("/api/calls/tow", {
    caller: name,
    location: street,
    description: description,
  }).catch(console.error);

  CancelEvent();
});


RegisterCommand("calltow", (source, args) => {
  CancelEvent();

  const name = GetPlayerName(source);
  let description = args.join(' ')

  setImmediate(() => {
    emitNet("sn:towCall", -1, { name, description });
  });
});


onNet("sn:taxiCallUpdate", ({ street, name, description }) => {
  console.log(street);

  cadfetch("/api/calls/taxi", {
    caller: name,
    location: street,
    description: description,
  }).catch(console.error);

  CancelEvent();
});

RegisterCommand("calltaxi", (source, args) => {
  CancelEvent();

  const name = GetPlayerName(source);
  let description = args.join(' ')

  setImmediate(() => {
    emitNet("sn:taxiCall", -1, { name, description });
  });
});

onNet("sn:911CallUpdate", ({ street, name, description }) => {
  console.log(`sn:911CallUpdate | ${street} | ${name} | ${description}`);
  cadfetch("/api/calls/911", {
    caller: name,
    location: street,
    description: description,
  }).catch(console.error);

  CancelEvent();
});

RegisterCommand("call911", (source, args) => {
  const name = GetPlayerName(source);
  let description = args.join(' ')

  console.log(`call911 ${source} | ${name} | ${description}`)
  
  setImmediate(() => {
    emitNet("sn:911Call", -1, { name, description });
  });
  CancelEvent();
});

onNet("wk:onPlateScanned", ({ cam, plate, index }) => {
  console.log(`${GetPlayerName(source)} Scanned Plate:\n#: ${plate}\nCam: ${cam}\nIndex: ${index}`);
  
});

onNet("wk:onPlateLocked", async ({ cam, plate, index }) => {
  console.log(`${GetPlayerName(source)} Scanned Plate:\n#: ${plate}\nCam: ${cam}\nIndex: ${index}`);
  let id = GetPlayerIdentifier(source);
  let camName;
  let reg = false;
  plate = plate.match("^%s*(.-)%s*$");
  wraithLastPlates.locked = { cam: cam, plate: plate, index: index, vehicle: cam.vehicle };
  let cadPlate = await cadfetch("/api/search/plate", {
    plate: plate,
  }).catch(console.error);
  
  console.log(cadPlate);
  
  if(cam == "front") {
    camName = "Front";
  }else if(cam == "rear") {
    camName = "Rear";
  }

  if(vehicle) {
    console.log(`Vehicle: ${vehicle}`);
  }else {
    console.log(`No Vehicle Data??`);
  }

  if(index) {
    console.log(`Index: ${index}`);
  }else {
    console.log(`No Index??`);
  }

  
});