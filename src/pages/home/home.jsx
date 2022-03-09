import './home.scss';

import { useState, useEffect } from 'react';

function Home () {

  const [company, setCompany] = useState([]);
  const [bank, setBank] = useState([]);
  const [complex, setComplex] = useState([]);
  const [house, setHouse] = useState([]);
  
  const [infoCompany, setInfoCompany] = useState('')
  const [infoComplex, setInfoComplex] = useState('')
  const [infoHouse, setInfoHouse] = useState('')
  const [infoBank, setInfoBank] = useState('')
  const [calc, setCalc] = useState(null)

    useEffect(() => {
      fetch('https://building-crm.herokuapp.com/company')
      .then((res) => res.json())
      .then((data) => {
          setCompany(data)
      });
    },[]);

    useEffect(() => {
      fetch('https://building-crm.herokuapp.com/bank')
      .then((res) => res.json())
      .then((data) => {
          setBank(data)
      });
    },[]);

  const handleCompany = (e)=>{
      setInfoCompany(company.find(comp => comp.company_id == e.target.value))
      fetch(`https://building-crm.herokuapp.com/complex?company=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
          setComplex(data)
      });
  };

  function handleHouse(evt) {

    setInfoComplex(complex.find(es=>es.complex_id == evt.target.value))

    fetch(`https://building-crm.herokuapp.com/house?complex=${evt.target.value}`)
    .then((res) => res.json())
    .then((data) => {
        setHouse(data)
    });
  }
  console.log(infoBank);
  function handleRoom(evt) {

    setInfoHouse(house.find(es=>es.house_id == evt.target.value))

  }

  function handleBank(evt) {

    setInfoBank(bank.find(es=>es.bank_id == evt.target.value))
    
    fetch(`https://building-crm.herokuapp.com/bank?bankId=${evt.target.value}&houseId=${infoHouse.house_id}`)
    .then((res) => res.json())
    .then((data) => {
        setCalc(data)
    });
    
  }  
  

  return (
<div className="home">
  <div className='container'>
  <h1 className='homeHeading'>Choose a house by filtering</h1>
  <div className='bg-white p-4 wrapper-info'>
  <div className='d-flex bg-white p-4 choose-wrapper'>
    <div className='choose'>
      <h2>Building company:</h2>
      <select defaultValue={''} onChange={handleCompany}>
        <option value="" disabled>Choose</option>
        {
          company.length > 0 && company.map((e,i) =>(
          <option className='option' value={e.company_id} key={i} id={i}>
            {e.company_name}</option>
          ))
        }
        
        </select>
    </div>
    <div className='choose'>
      <h2>Complex:</h2>
      <select defaultValue={''} onChange={handleHouse}>
      <option value="" disabled>Choose</option>
        {
          complex.length > 0 && complex.map((e,i) =>(
            <option className='option' value={e.complex_id} key={i}>
            {e.compex_name}</option>
          ))
        }
        </select>
    </div>
    <div className='choose'>
      <h2>Number of rooms:</h2>
      <select defaultValue={''} onChange={handleRoom}>
      <option value="" disabled>Choose</option>
        {
          house.length > 0 && house.map((e,i) =>(
            <option className='option' value={e.house_id} key={i}>
            {e.house_rooms}</option>
          ))
        }
      </select>
    </div>
    <div className='choose'>
      <h2>Mortgage duration:</h2>
      <select defaultValue={''} onChange={handleBank}>
      <option value="" disabled>Choose</option>
        {
          bank.length > 0 && bank.map((e,i) =>(
            <option className='option' value={e.bank_id} key={i}>
            {e.mortgage_duration}</option>
          ))
        }
        </select>
    </div>
    <div>  
        </div>
  </div>
  <div className='bg-white info-result'>
        <div>
        <p id='companyName'><h3>{infoCompany.company_name}</h3></p>
        <p id='complexName'><b>{infoComplex.compex_name}</b></p>
       {infoHouse && (
         <p>
            <p> {infoHouse.house_rooms} rooms</p>
            <p>{infoHouse.overall_size} meter square</p>
            <p><b> {infoHouse.house_price_1kv} meter square</b></p>
            <p> {infoHouse.house_location}</p>
        </p>
        
       )}

</div>
        {infoBank && (
          <div>
            <h2>Bank.uz</h2>
            <div><h3> {infoBank.bank_name}</h3></div>
            <div>Mortgage duration: {infoBank.mortgage_duration} year</div>
            <div><h4>Starting Payment: {infoBank.starting_payment} %</h4></div>
            <div>Bank Service: {infoBank.bank_service}</div>
        </div>
       )}
        {calc && (
          <div>
            <h5>Calculator</h5>
            <div><b> House price 1kv: {calc.house_price}</b></div>
            <div><b>Starting Payment: {calc.starting_payment}</b></div>
            <div><b> Monthly Payment: {calc.monthly_payment}</b></div>
        </div>
       )}
       </div>
  </div>


  </div>
</div>
  );
}

export default Home;