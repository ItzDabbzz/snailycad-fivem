/// <reference path="../../node_modules/@citizenfx/client/natives_universal.d.ts" />


onNet("sn:towCall", ({ name, description }) => {
  console.log(`onNet sn:towCall ${name} | ${description}`)
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1));

  const lastStreet = GetStreetNameAtCoord(x, y, z, 0, 0);
  const streetName1 = GetStreetNameFromHashKey(lastStreet[0]);
  const streetName2 = GetStreetNameFromHashKey(lastStreet[1]);
  const streetNameCorner = `${streetName1} & ${streetName2}`
  let final = streetName2 ? streetName1 : streetNameCorner
  console.log(`onNet sn:towCall ${x} ${y} ${z} | ${lastStreet} | ${final} `)

  setImmediate(() => {
    emitNet("sn:towCallUpdate", { final, name, description });
  });

  createNotification(
    "CHAR_PROPERTY_TOWING_IMPOUND",
    0,
    "Your Call has been reported to any available towers!",
    "Tow Truck Service",
  );
});

RegisterCommand("calltow", (source, description) => {
  CancelEvent();

  const name = GetPlayerName(source);

  setImmediate(() => {
    emit("sn:towCall", -1, { source, name, description });
  });
});

onNet("sn:taxiCall", ({ name, description }) => {
  console.log(`onNet sn:taxiCall ${name} | ${description}`)
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1));

  const lastStreet = GetStreetNameAtCoord(x, y, z, 0, 0);
  const streetName1 = GetStreetNameFromHashKey(lastStreet[0]);
  const streetName2 = GetStreetNameFromHashKey(lastStreet[1]);
  const streetNameCorner = `${streetName1} & ${streetName2}`
  let final = streetName2 ? streetName1 : streetNameCorner
  console.log(`onNet sn:taxiCall ${x} ${y} ${z} | ${lastStreet} | ${final} `)

  setImmediate(() => {
    emitNet("sn:taxiCallUpdate",  final, name, description );
  });

  createNotification(
    "CHAR_TAXI",
    0,
    "Your Call has been reported to any available taxi drivers!",
    "Taxi Service",
  );
});

RegisterCommand("calltaxi", (source, description) => {
  CancelEvent();

  const name = GetPlayerName(source);

  setImmediate(() => {
    emit("sn:taxiCall", source, name, description);
  });
});

onNet("sn:911Call", ({ name, description }) => {
  console.log(`onNet sn:911Call ${name} | ${description}`)
  const [x, y, z] = GetEntityCoords(GetPlayerPed(-1));

  const lastStreet = GetStreetNameAtCoord(x, y, z, 0, 0);
  const streetName1 = GetStreetNameFromHashKey(lastStreet[0]);
  const streetName2 = GetStreetNameFromHashKey(lastStreet[1]);
  const streetNameCorner = `${streetName1} & ${streetName2}`
  let final = streetName2 ? streetName1 : streetNameCorner
  console.log(`onNet sn:911Call ${x} ${y} ${z} | ${lastStreet} | ${final} `)
  setImmediate(() => {
    emitNet("sn:911CallUpdate", final, name, description );
  });

  createNotification(
    "CHAR_CALL911",
    0,
    "Your call has been reported to the emergency services",
    "Emergency Services",
  );
});

RegisterCommand("call911", (source, args) => {
  console.log(`call911 ${source} | ${args}`)
  const name = GetPlayerName(source);
  const description = args;

  setImmediate(() => {
    emit("sn:911Call", { name, description });
  });
});

function createNotification(picture, icon, message, title) {
  SetNotificationTextEntry("STRING");
  AddTextComponentString(message);
  SetNotificationMessage(picture, picture, true, icon, title);
}
