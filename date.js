function getDay() {
  const today = new Date();
  const options = {
    // weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  console.log(today.toLocaleDateString("en-US", options));
}

module.export = getDay;
