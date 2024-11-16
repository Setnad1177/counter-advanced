import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [value, setValue] = useState(0);
    const [startValue, setStartValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [error, setError] = useState("");

    // Load values from localStorage on page load
    useEffect(() => {
        const savedValue = localStorage.getItem("counterValue");
        const savedStartValue = localStorage.getItem("startValue");
        const savedMaxValue = localStorage.getItem("maxValue");

        if (savedValue) setValue(JSON.parse(savedValue));
        if (savedStartValue) setStartValue(JSON.parse(savedStartValue));
        if (savedMaxValue) setMaxValue(JSON.parse(savedMaxValue));
    }, []);

    // Save `value`, `startValue`, and `maxValue` to localStorage
    useEffect(() => {
        localStorage.setItem("counterValue", JSON.stringify(value));
        localStorage.setItem("startValue", JSON.stringify(startValue));
        localStorage.setItem("maxValue", JSON.stringify(maxValue));
    }, [value, startValue, maxValue]);

    const incHandler = () => {
        if (value < maxValue) {
            setValue(value + 1);
        }
    };

    const resetHandler = () => {
        setValue(startValue);
    };

    const setHandler = () => {
        if (startValue >= maxValue || startValue < 0 || maxValue <= 0) {
            setError("Invalid values");
        } else {
            setValue(startValue); // Set the counter to the start value
            setError("");
            localStorage.setItem("startValue", JSON.stringify(startValue));
            localStorage.setItem("maxValue", JSON.stringify(maxValue));
        }
    };

    return (
        <div className="App">
            <div className="settings">
                <label>Max value:</label>
                <input
                    type="number"
                    value={maxValue}
                    onChange={(e) => setMaxValue(+e.target.value)}
                />
                <label><br/>Start value:</label>
                <input
                    type="number"
                    value={startValue}
                    onChange={(e) => setStartValue(+e.target.value)}
                />
                <button onClick={setHandler}>Set</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="counter">
                <h1 style={{ color: value >= maxValue ? "red" : "white" }}>{value}</h1>
                <button onClick={incHandler} disabled={value >= maxValue}>Inc</button>
                <button onClick={resetHandler}>Reset</button>
            </div>
        </div>
    );
}

export default App;
