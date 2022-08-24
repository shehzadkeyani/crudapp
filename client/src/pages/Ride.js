
import React, {useState, useEffect} from "react";
import Axios from "axios";


 const Ride = () => {
  const [skPloc, setskPloc] = useState("");
  const [skDloc, setskDloc] = useState("");
  const [skFareAmt, setskFareAmt] = useState("");
  const [skNotes, setskNotes] = useState("");
  const [skDataSet, setskDataSet] = useState([]);
  const [skCurRecord, setskCurRecord] = useState("");

  const [skvar1, setskvar1] = useState("");
  const [skvar2, setskvar2] = useState("");
  const [skvar3, setskvar3] = useState("");
  const [skvar4, setskvar4] = useState("");

  const [skNewRecord, setskNewRecord] = useState ("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setskDataSet(response.data);
      
    });
  },  []  );


  const skInsertRecord = () => {
    if(skPloc===""||skDloc===""||skFareAmt===""||skNotes==="") 
      alert("Please Provide Required Information");
    else{
      Axios.post("http://localhost:3001/api/insert", {
      svarPloc: skPloc, 
      svarDloc: skDloc, 
      svarFareAmt: skFareAmt, 
      svarSpNotes: skNotes,
      });
    
      alert("Successful Insert");
      setskDataSet([...skDataSet,
        {tcPloc: skPloc, tcDloc: skDloc, tcFareAmt: skFareAmt, tcSpNotes: skNotes},]);
      setskCurRecord(skPloc);  
    }
  };

  const skUpdateRecord = (skvar) => {
    Axios.put("http://localhost:3001/api/update", {
      sksvar1: skvar,
      sksvar2: skvar2,
      sksvar3: skvar3,
      sksvar4: skvar4,
    });

    setskvar1("");
    setskvar2("");
    setskvar3("");
    setskvar4("");
  };

  const skDeleteRecord = (skvarPloc) => {
    Axios.delete(`http://localhost:3001/api/delete/${skvarPloc}`);
  };

  return (
    <div>
      <h1>Take a Ride</h1>
      <p>Happy Traveling</p>
      <div>
        <label>Pick Up Location <input type="text" className="sktextinput" name="Ploc" onChange={(e)=>{setskPloc(e.target.value);}}/ > </label>
        <br></br>
        <br></br>
        <label>Drop Off Location <input type="text" className="sktextinput" name="Dloc" onChange={(e)=>{setskDloc(e.target.value);}} /> </label>
        <br></br>
        <br></br>
        <label>Fare Offered <input type="text" className="sktextinput" name="FareAmt" onChange={(e)=>{setskFareAmt(e.target.value);}} /> </label>
        <br></br>
        <br></br>
        <label>Special Notes <input type="text" className="sktextinput" name="SpNotes" onChange={(e)=>{setskNotes(e.target.value);}} /> </label>
        <br></br>
        <br></br>
        <button onClick={skInsertRecord}>Submit</button>
        
      </div>
      
      {
         <h1> {skCurRecord}   </h1>
      }
      
      {
        skDataSet.map((val) => {
          return (
           <div>  
              <h1> {val.tcPloc}  |  {val.tcDloc}  |  {val.tcFareAmt}  |  {val.tcSpNotes} </h1> 
              <button onClick={ () => { skDeleteRecord(val.tcPloc) } }>Delete</button>

              <input type="text" onChange = {(e) => {setskvar1(e.target.value);}}/>
              <input type="text" onChange = {(e) => {setskvar2(e.target.value);}}/>
              <input type="text" onChange = {(e) => {setskvar3(e.target.value);}}/>
              <input type="text" onChange = {(e) => {setskvar4(e.target.value);}}/>

              <button onClick={ () => { skUpdateRecord(val.tcPloc); } }>Update</button>
          </div>
          );
        })
      }
      
    </div>
  );

}

export default Ride;
