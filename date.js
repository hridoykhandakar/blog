export default function getDay() {
  const today = new Date();
  const options = {
    // weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  console.log(today.toLocaleDateString("en-US", options));
}

export let pi = 3.14;

// export default getDay;
