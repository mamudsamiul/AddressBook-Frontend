import React,{ useState, useEffect } from "react"
import { toast } from 'react-toastify';
import Edit from "H:/React App/addressbook-frontend/src/assets/edit.png"
import Delete from "H:/React App/addressbook-frontend/src/assets/delete.png"
import "./address.css"
import { useParams, Link, withRouter,Route } from 'react-router-dom';
import AddressBook from "../../services/addressbook-service"
const Address=({person,updates})=>{
    const service= new AddressBook();
    const deleteAddress=(id)=>{
        service.deletePerson(id).then(
            (response)=>{
                toast.success("Deleted sucessfully")
                updates(id);
            },
            (error)=>{
                toast.error("Unable to delete")
            }
        )
    }
    const editAddress=(key)=>{
        console.log(key)        
    }
    return(
        <div>
            <div className="data-container">
                <div className="data-details">
                    <span className="data-name " >
                        <span className="data-text">{person.name}</span> 
                    </span>
                    <span className="data-address">
                    <span className="data-text"> {person.address}</span>
                   
                    </span>
                    <span className="data-city">
                    <span className="data-text">{person.city}</span>
                    
                    </span>
                    <span className="data-state">
                    <span className="data-text"> {person.state}</span>
                   
                    </span>
                    <span className="data-zip">
                    <span className="data-text">{person.zip}</span>
                    
                    </span>
                    <span className="data-phone">
                    <span className="data-text">{person.phone}</span>
                    
                    </span>
                    <span className="data-delete">
                        <img className="image-delete" src={Delete} type="button" onClick={()=>{deleteAddress(person.id);}}/>
                        
                    </span>
                    <span className="data-update data-text">
                        <Link to={{ 
                            pathname:"addperson",
                        aboutProps:{
                            id:person.id,
                            edit:true
                        }}
                           
                        }>
                            <img className="image-edit" src={Edit} type="button" onClick={()=>{editAddress(person.id);}}/></Link>
                    </span>
                    
                </div>
                </div>
        </div>
    )
}
export default Address;