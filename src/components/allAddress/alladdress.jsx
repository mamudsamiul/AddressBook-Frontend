import React,{useState,useEffect} from "react"
import Address from "../address/address"
import { toast } from 'react-toastify';
import AddressBook from "../../services/addressbook-service"
const AllPerson=()=>{
    const service= new AddressBook();
    useEffect(()=>{

    },[]);

    const getAllAddress=()=>{
        service.getAddressbook().then(
            (response)=>{
                console.log(response.data)
                toast.success("Data Loaded")
                setPerson(response.data)
            },
            (error)=>{
                console.log(error)
                toast.error("Server down!!")
            }
        )
    }

    useEffect(()=>{
        getAllAddress();
    },[]);
    const [persons,setPerson]=useState([]);

    const updateAddress=(id)=>{
        setPerson(persons.filter((c)=>c.id!==id))
    };
    return(
        <div>
            {
            persons.length>0?persons.map((item)=>(
                    <Address key={item.id} person={item} updates={updateAddress}/>
                    )):""
                }
        </div>
    )
}
export default AllPerson;