import { useState } from "react";
import axios from 'axios';
import './App.css'; 

function App() {
  const [response, setResponse] = useState(null);
  const [formdata, setFormdata] = useState({
    Temperature: "",
    RH: "",
    Ws: "",
    Rain: "",
    FFMC: "",
    DMC: "",
    ISI: "",
    Classes: "",
    Region: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formdata);

    axios.post("/api/predict", formdata)
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Predictive Input Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border border-secondary rounded shadow bg-light">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">Temperature</label>
            <input type="number" className="form-control form-control-sm" name="Temperature" value={formdata.Temperature} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">RH</label>
            <input type="number" className="form-control form-control-sm" name="RH" value={formdata.RH} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">Ws</label>
            <input type="number" className="form-control form-control-sm" name="Ws" value={formdata.Ws} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">Rain</label>
            <input type="number" className="form-control form-control-sm" name="Rain" value={formdata.Rain} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">FFMC</label>
            <input type="number" className="form-control form-control-sm" name="FFMC" value={formdata.FFMC} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">DMC</label>
            <input type="number" className="form-control form-control-sm" name="DMC" value={formdata.DMC} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">ISI</label>
            <input type="number" className="form-control form-control-sm" name="ISI" value={formdata.ISI} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="font-weight-bold">Classes</label>
            <input type="number" className="form-control form-control-sm" name="Classes" value={formdata.Classes} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label className="font-weight-bold">Region</label>
            <input type="number" className="form-control form-control-sm" name="Region" value={formdata.Region} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Predict</button>
      </form>
      {response && (
        <div className="mt-4 text-center">
          <h4 className="font-weight-bold">Prediction:</h4>
          <h5 className="text-success">{response.prediction}</h5>
          </div>
      )}
    </div>
  );
}

export default App;
