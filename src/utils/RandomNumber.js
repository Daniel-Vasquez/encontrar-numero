function GetRandomArbitrary(min, max) {
  const numberRandom = parseInt(Math.random() * (max - min) + min);

  return numberRandom;
}

export default GetRandomArbitrary;
