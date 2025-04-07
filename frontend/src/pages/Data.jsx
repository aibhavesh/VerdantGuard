import React from 'react';
import axios from 'axios';
import { useEffect,useState} from 'react';


const Data = () => {
    let [alluser, setAlluser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/signup").then((response) => {
        setAlluser(response.data);
    })
  },[])

  return (
    <>
   <div className="container">
          <div className="page-inner">
            
                <div className="row">
                  <div className="col-md-12">
                <h1>User data</h1>
                  <table className='table table-dark'>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      alluser.map((item, index)=>{
                        return(
                          <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.address}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                  </div>
                </div>
             
            
          </div>
        </div>
    </>
  )
}

export default Data