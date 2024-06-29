import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState(null);
    console.log(data, 'data')

    useEffect(() => {
        fetch('http://localhost:3005/')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);
  return (
    <div className="App">
        {data}ff
    </div>
  );
}

export default App;
