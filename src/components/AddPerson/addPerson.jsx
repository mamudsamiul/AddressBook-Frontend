import React, { useState, useEffect } from 'react';
import logo from "H:/React App/addressbook-frontend/src/assets/logo.jpg"
import cancel from "H:/React App/addressbook-frontend/src/assets/cancel.jpg"
import "./addPerson.css"
import Select from "react-select";
import data from "../../data/data.json"
import { toast, ToastContainer } from 'react-toastify';
import { useParams, Link, withRouter } from 'react-router-dom';
import AddressBook from "../../services/addressbook-service"
const AddPerson=(props)=>{
    let counter=0;
    const service= new AddressBook();
    const nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}[A-Za-z\s]{0,}$");
    const phoneRegex = RegExp("^\\d{2}[1-9]\\d{7}$");
    const zipRegex = RegExp("^\\d{6}$");
    const [pstate, setPstate] = useState(null);
    const [pcity, setPcity] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [formValue, setForm] = useState([]);
    const [errorValue,setError]= useState([]);
    const [blankerror,setBlankError]= useState([]);
    useEffect(async()=>{
        setError({
            nameerror:"",
            phoneerror:"",
            ziperror:"",
            addresserror:""
        })
        setBlankError({
            nameblankerror:"",
            phoneblankerror:"",
            zipblankerror:"",
            addressblankerror:""
        })
        if(props.location.aboutProps.edit===false){
        }else{
        const data=await service.getPerson(props.location.aboutProps.id)
        .then(function(response) {
            toast.success("Fetched sucessfully")
            return response;
          })
          .catch(function(error) {
            console.log(error);
          });
          setForm(data.data)
          setPstate({...pstate,region:data.data.state})
          setPcity({...pcity,name:data.data.city})

    }},[])

   
    const postData=(data)=>{
        
        service.addPerson(data).then(
            (response)=>{ 
                console.log(response.data)
                toast.success("Added Sucessfully")
            },
            (error)=>{
                console.log(error)
                toast.error("Server down!!")
            }
        )
   
    }
    const updateData=(data)=>{
        service.updatePerson(data)
        .then(
            (response)=>{ 
                console.log(response.data)
                toast.success("Updated Sucessfully !!")
            },
            (error)=>{
                console.log(error)
                toast.error("Server down!!")
            }
        )
    }
    const notBlank=()=>{
        if(counter==0){
            let address=""
            if(typeof(formValue.address)=="undefined"){
                address="Field Required"
            }
            setBlankError({...blankerror,addressblankerror:address})
            counter++
        }
        else{

        }
        }
    
    const handleNameChange=(event) =>{
            
            setForm({...formValue,name: event.target.value});
            if(nameRegex.test(event.target.value)){
                
                setError({...errorValue,nameerror: ""});
              }else{
                setError({...errorValue,nameerror: "incorrect name"});
                
              }
              console.log({formValue})
              console.log({blankerror})
              console.log({errorValue})
            
    }
      const handleAddressChange=(event)=> {

        setForm({...formValue,address: event.target.value});
        if(typeof(formValue.address)!="undefined" && formValue.address!==""){
            setError({...errorValue,addresserror: ""});
        }
        else{
            setError({...errorValue,addresserror: "incorrect address"});
            
          }
        console.log({formValue})
              console.log({blankerror})
              console.log({errorValue})
      }

      const handlePhoneChange=(event)=> {
        
        setForm({...formValue,phone: event.target.value});
        if(phoneRegex.test(event.target.value)){
            
            setError({...errorValue,phoneerror: ""});
          }else{
            setError({...errorValue,phoneerror:"incorrect Phone No"});
          }
          console.log({formValue})
              console.log({blankerror})
              console.log({errorValue})
            
            
      }
      const handleCityChange=(event) =>{
        console.log(event.name)
        setPcity(event)
        setForm({...formValue,city: event.name});
      }
      const handleStateChange=(event)=> {
          console.log(event.region)
          setPstate(event)
          setCityList(event.city)
        setForm({...formValue,state: event.region});
      }
      const handleZipChange=(event)=> {
        
        setForm({...formValue,zip: event.target.value});
        if(zipRegex.test(event.target.value)){
           
            setError({...errorValue,ziperror: ""});
          }else{
            setError({...errorValue,ziperror:"Incorrect Pincode"});
  
          }
            console.log({formValue})
            console.log({blankerror})
           console.log({errorValue})
        
            
      }

    const handleSubmit= (event)=> {
       if(props.location.aboutProps.edit===false){
        console.log(formValue);
        postData(formValue);
        setForm({...formValue,
            name: '',
            phone:'',
            address:'',
            city:'',
            state:'',
            zip:''
        })
        setPstate({...pstate,region:''})
          setPcity({...pcity,name:''})

    }else{
        console.log(formValue.name);
        updateData(formValue);
        setForm({...formValue,
            name: '',
            phone:'',
            address:'',
            city:'',
            state:'',
            zip:''
        })
        setPstate({...pstate,region:''})
          setPcity({...pcity,name:''})
    }
        console.log(formValue);
        event.preventDefault(); 
    }

    const resetHover=()=>{
        console.log("asdsdfs");
    }
    
    const enableButton=()=>{
        if(errorValue.nameerror==="" && errorValue.phoneerror==="" && errorValue.ziperror===""){
           
        }
        else{
            
        }
    }
    return(
        
        <div className="addressbook-main">
            <ToastContainer />
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                        <span className="address-text">ADDRESS</span> <br />
                        <span className="address-text address-book">BOOK</span>
                    </div>
                </div>
            </header>
            <div className="content">
                
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-head">
                        <span className="blank"></span>
                        <span className="form-head-text">
                        PERSON ADDRESS FORM
                        </span>
                        <span className="form-cancel" >
                            <Link to="addressbook">
                             <img src={cancel} alt="Submit"/>
                             </Link>
                        </span>
                    </div>
                    <div className="form-body">
                    
                        <div className="row"> 
                            <label className="label text" htmlFor="name">Full Name</label><br/>
                            <input className="input" type="text" id="name" name="name" value={formValue.name}  onChange={handleNameChange}></input><br/>
                            </div>
                            <div className="error" > {errorValue.nameerror} </div>
                        <div className="row">
                            <label className="label text">Phone Number</label><br/>
                            <input className="input" type="text" id="phone" name="phone" value={formValue.phone}  onChange={handlePhoneChange}></input><br/>
                            </div>
                            <div className="error" > {errorValue.phoneerror} </div>
                        <div className="row">
                            <label className="label text">Address</label><br/>
                            <textarea className="input" id="address" name="address" value={formValue.address} onChange={handleAddressChange}
                            style={{ height: '100px' }}></textarea>
                        </div>
                        <div className="error" > {errorValue.addresserror} </div>
                        
                        <div className="drop-container">
                            <div className="label text sidebar">
                                <label> City</label>
                                <Select className="drop" 
                                value={pcity} 
                                options={cityList} 
                                getOptionLabel={x => x.name}  
                                onChange={handleCityChange} 
                                placeholder="Select City"/>
                            </div>
                            <div className="label text sidebar">
                                <label>State</label>
                                <Select className="drop" 
                                value={pstate} 
                                options={data} 
                                getOptionLabel={x => x.region}
                                onChange={handleStateChange} 
                                placeholder="Select State"/>
                                   
                                
                            </div>
                            <div className="label text sidebar">
                                <label>Zip Code</label>
                                <input className="input-zip" type="text" value={formValue.zip} onChange={handleZipChange}></input>
                            </div>
                            
                        </div>
                        <div className="error" > {errorValue.ziperror} </div>
                        
                    </div>
                    <div className="button-container">
                        <div className="button-row">
                            
                                <input type="submit" className="button submitButton" value="Add" disabled={
                                   !( errorValue.nameerror==="" &&
                                   errorValue.phoneerror==="" &&
                                   errorValue.ziperror==="" &&
                                   typeof(formValue.name)!="undefined" &&
                                   typeof(formValue.address)!="undefined" &&
                                   typeof(formValue.phone)!="undefined" &&
                                   typeof(formValue.city)!="undefined" &&
                                   typeof(formValue.state)!="undefined" &&
                                   typeof(formValue.zip)!="undefined"
                                   
                                   )
                                }/>
                                <button type="reset" className="resetButton button">Reset</button>
                                
                            </div>
                        </div>
                    <div>
                        
                    </div>
                </form>

            </div>
            
        </div >
    );
}

export default AddPerson;
