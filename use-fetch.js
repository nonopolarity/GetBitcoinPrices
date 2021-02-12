
fetch("   ")
  .then(res => {
    if (res.ok && res.header.get("Content-Type") === "application/json") {
      return res.json();
    } else {
      throw new Error(`unexpected response status or content type`);
    }
  })
  .then(data => {
    // use data
  })
  .catch(err => {
    // user offline, then fetch() would reject,
    // but if bad response status or content type, handled by the above throw
    console.log(err);
  });