"use client";

import { useState } from "react";

const getRandomImage = async () => {
  try {
    const response = await fetch("https://source.unsplash.com/random");
    return response.url;
  } catch (error) {
    console.error("Error fetching random image:", error);
    return "";
  }
};

export default function Home() {
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(10);
  const [excludeChosen, setExcludeChosen] = useState<boolean>(false);
  const [chosenNumber, setChosenNumber] = useState<number | null>(null);
  const [excludedNumbers, setExcludedNumbers] = useState<number[]>([]);

  const generateRandomNumber = () => {
    const range = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    const availableNumbers = excludeChosen
      ? range.filter(
          (num) => num !== chosenNumber && !excludedNumbers.includes(num)
        )
      : range.filter((num) => !excludedNumbers.includes(num));

    if (availableNumbers.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomNum = availableNumbers[randomIndex];

    setChosenNumber(randomNum);

    if (excludeChosen) setExcludedNumbers((prev) => [...prev, randomNum]);
    else setExcludedNumbers([]);
  };

  const clear = () => {
    setChosenNumber(null);
    setExcludedNumbers([]);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl mb-4">Random Number Generator</h1>
      <label className="block mb-2">
        Start:
        <input
          type="number"
          value={start}
          onChange={(e) => {
            console.log(e.target.value);
            setStart(parseInt(e.target.value));
          }}
          className="ml-2"
        />
      </label>
      <br />
      <label className="block mb-2">
        End:
        <input
          type="number"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value))}
          className="ml-2"
        />
      </label>
      <br />
      <label className="block mb-2">
        Exclude Chosen Number:
        <input
          type="checkbox"
          checked={excludeChosen}
          onChange={() => setExcludeChosen((prev) => !prev)}
          className="ml-2"
        />
      </label>
      <br />
      {chosenNumber !== null && (
        <div className="mt-4">Chosen Number: {chosenNumber}</div>
      )}
      <br />
      <button
        onClick={generateRandomNumber}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Generate Random Number
      </button>
      <button
        onClick={clear}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear
      </button>
      <br />
      <br />
      {excludeChosen && excludedNumbers.length > 0 && (
        <div className="flex flex-row">
          <h2>Excluded Numbers:</h2>
          <div className="grid grid-cols-10 gap-4">
            {excludedNumbers.map((num, index) => (
              <div key={index} className="card p-4">
                <h1>{num}</h1>
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
      {excludedNumbers.length === end - start + 1 && (
        <div>
          <p>Done! All numbers have been generated.</p>
        </div>
      )}
    </div>
  );
}
