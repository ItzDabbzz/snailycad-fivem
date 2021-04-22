/// <reference path="../../node_modules/@citizenfx/server/natives_server.d.ts" />
let wraithLastPlates = { scanned: {}, locked: {} };
// eslint-disable-next-line no-unused-vars


onNet("sn:towCallUpdate", ({ street, name, description }) => {
  exports['snailycad-fivem']['cadfetch']("/api/calls/tow", {
    caller: name,
    location: street,
    description: description.join(" "),
  }).catch(console.error);

  CancelEvent();
});

onNet("sn:taxiCallUpdate", ({ street, name, description }) => {
  console.log(street);

  exports['snailycad-fivem']['cadfetch']("/api/calls/taxi", {
    caller: name,
    location: street,
    description: description.join(" "),
  }).catch(console.error);

  CancelEvent();
});

onNet("sn:911CallUpdate", ({ street, name, description }) => {
  console.log(`sn:911CallUpdate | ${street} | ${name} | ${description}`);
  exports['snailycad-fivem']['cadfetch']("/api/calls/911", {
    caller: name,
    location: street,
    description: description.join(" "),
  }).catch(console.error);

  CancelEvent();
});

onNet("sn:PlateSearch", ({ plate }) => {
  exports['snailycad-fivem']['cadfetch']("/api/search/plate", {
    plate: plate
  }).catch(console.error);

  CancelEvent();
});

onNet("sn:NameSearch", ({ name }) => {
  exports['snailycad-fivem']['cadfetch']("/api/search/name", {
    name: name
  }).catch(console.error);

  CancelEvent();
});

onNet("wk:onPlateScanned", ({ cam, plate, index }) => {
  console.log(`${GetPlayerName(source)} Scanned Plate:\n#: ${plate}\nCam: ${cam}\nIndex: ${index}`);
  
});

onNet("wk:onPlateLocked", ({ cam, plate, index }) => {
  console.log(`${GetPlayerName(source)} Scanned Plate:\n#: ${plate}\nCam: ${cam}\nIndex: ${index}`);
  let id = GetPlayerIdentifier(source);
  let camName;
  let reg = false;
  plate = plate.match("^%s*(.-)%s*$");
  wraithLastPlates.locked = { cam: cam, plate: plate, index: index, vehicle: cam.vehicle };
  let cadPlate = cadfetch("/api/search/plate", {
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