"use client";

import { useState } from "react";

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
    <div className="justify-center min-h-screen p-20">
      <h1 className="text-4xl mb-4 font-bold">Random Number Generator</h1>
      <label className="block mb-2 text-lg">
        Start:
        <input
          type="number"
          value={start}
          onChange={(e) => setStart(parseInt(e.target.value))}
          className="ml-2"
        />
      </label>
      <br />
      <label className="block mb-2 text-lg">
        End:
        <input
          type="number"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value))}
          className="ml-2"
        />
      </label>
      <br />
      <label className="block mb-2 text-lg">
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
        <div className="mt-6">
          <h2 className="text-3xl mb-2 font-bold">Chosen Number:</h2>
          <div className="text-5xl font-extrabold text-blue-500">
            {chosenNumber}
          </div>
        </div>
      )}
      <br />
      <button
        onClick={generateRandomNumber}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Generate Random Number
      </button>
      <button
        onClick={clear}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
      >
        Clear
      </button>
      <br />
      {excludedNumbers.length === end - start + 1 && (
        <div className="mt-6 text-green-600 font-semibold">
          <p>Done! All numbers have been generated.</p>
        </div>
      )}
      <br />
      {excludeChosen && excludedNumbers.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl mb-2 font-bold">Excluded Numbers:</h2>
          <div className="grid grid-cols-5 gap-4">
            {excludedNumbers.slice().reverse().map((num, index) => (
              <div
                key={index}
                className="card p-4 bg-gray-200 text-gray-800 font-semibold text-center"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
      <br />
    </div>
  );
}
