export const sendRegister = async (username, password) => {
  const response = await fetch(
    "http://server.bykovski.de:8000/users/register",
    {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
    }
  );
  return response;
};

export const sendLogin = async (username, password) => {
  let details = { username: username, password: password };
  let formBody = [];
  for (let prop in details) {
    let encodedKey = encodeURIComponent(prop);
    let encodedValue = encodeURIComponent(details[prop]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const response = await fetch("http://server.bykovski.de:8000/users/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody,
  });
  return response;
};
