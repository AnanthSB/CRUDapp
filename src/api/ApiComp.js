import React, { useEffect } from 'react';
import { useState } from 'react';
import API from "./api.js";

const ApiComp = (props)=> {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const [putName, setPutName] = useState('');
  const [putUserName, setPutUserName] = useState('');
  const [putEmail, setPutEmail] = useState('');
  const [data, setData] = useState([]);
  const [editIsActiveID, setEditIsActiveID] = useState('');

  //getData
  const getData = () =>{
    console.log("before");
    API.get(`/users`)
    .then(res => {
        setData(res.data);
        console.log("on Success");
    }).catch((err)=>console.log(err));
    console.log("on Completion");
  };

  //Post
  const handleSubmit = (event) => {
    event.preventDefault();

    API.post(`/users`,{
      name:name,
      username:userName,
      email:email
    })
      .then(res => {
        getData();
        setName('');
        setUserName('');
        setEmail('');
          window.alert("successfully posted data", res.data);
        }).catch((err)=>alert(err));
  } 
    //del
  const delData = (id)=>{
    if(window.confirm("Are you sure, want to delete ?")){
      API.delete(`users/${id}`)
      .then((res)=>{
        console.log('Successfully deleted ',res.data)
        getData();
      }).catch((err)=>console.log(err));
    }
  };

  // put data
  const putData = (id)=>{
    API.put(`users/${id}`,{
      name:putName,
      username:putUserName,
      email:putEmail
    }).then((res)=>{
      getData();
    }).catch((err)=>window.alert(err));
  };

    return (
      <>
      <div className='w-full'>
        <div className='w-full flex items-self-start justify-center border-b h-[40px] mb-5'>
          <h2 className='font-bold'>CRUD Application cum Get Post Put and Delete operations using Axios</h2>
        </div>
       <div className='gap-10 flex pl-2 justify-center'>
        <div className='w-1/2 pr-9 flex flex-col items-center justify-center border-r-[2px]'>
          {/* GetData */}
          <div className='text-center border p-[3px] w-full h-[150px] flex items-center justify-center'>
              <button type="button" className='w-[200px] bg-black text-white w-[200px]' onClick={getData}><span className='font-bold'>G</span>et/Refresh Data</button>
          </div>
          <div className='max-h-[60vh] overflow-y-auto'>
          <h3 className='w-full flex justify-center items-center border-b mb-4'><span className='font-bold'>R</span><span>ead Data</span></h3>
            <table className='border w-full mb-1 max-h-[100px] overflow-scroll'>
              <tr>
                  <td className='border font-bold w-[80px] pl-3'>SL.No</td>
                  <td className='border font-bold pl-[20px] text-left w-[220px]'>Name</td>
                  <td className='border font-bold pl-[20px] text-left w-[220px]'>UserName</td>
                  <td className='border font-bold pl-[20px] text-left w-[220px]'>EmailID</td>
                  <td className='border font-bold w-[220px] text-center'>Action</td>
              </tr>
              {data.length>0 &&
              data.map((item,i)=>{
                  return <tr className='bg-[#eee] border-b-[4px]' key={item.id}>
                    <td className='text-center'>{i+1}</td>
                    <td className='pl-[20px]'>
                      {editIsActiveID === item.id?
                      <input type="text" className='w-full indent-1' defaultValue={item.name} onChange={(e)=>setPutName(e.target.value)}/>:
                      <p>{item.name}</p>
                      }
                    </td>
                    <td className='pl-[20px]'>
                      {editIsActiveID === item.id?
                      <input type="text" className='w-full indent-1' defaultValue={item.username} onChange={(e)=>setPutUserName(e.target.value)}/>:
                      <p>{item.username}</p>
                      }
                    </td>
                    <td className='pl-[20px]'>
                      {editIsActiveID === item.id?
                      <input type="text" className='w-full indent-1' defaultValue={item.email} onChange={(e)=>setPutEmail(e.target.value)}/>:
                      <p>{item.email}</p>
                      }
                    </td>
                    <td className='flex w-full justify-center gap-3 pl-2'>
                      <button id={`${item.id}`} type="button" onClick={()=>delData(item.id)} className='w-[70px] text-center cursor-pointer bg-black text-white px-3 rounded-full my-2 '>
                        <span className='font-bold'>D</span>elete
                      </button>
                      {editIsActiveID !== item.id?
                      <button id={`${item.id}`} type="button" onClick={()=>
                        {
                          setEditIsActiveID(item.id)
                          setPutName(item.name)
                          setPutUserName(item.username)
                          setPutEmail(item.email)
                        }
                      } className='text-center w-[105px] cursor-pointer bg-black text-white px-3 rounded-full my-2 mx-1 '>
                        <span className='font-bold'>U</span>pdate/<span className='font-bold'>P</span>ut
                      </button>:
                      <button id={`${item.id}`} type="button" onClick={()=>{
                        putData(item.id);
                        setEditIsActiveID('');
                      }} className='text-center w-[105px] cursor-pointer bg-black text-white px-3 rounded-full my-2 mx-1 '>
                        Save
                      </button>
                      }
                    </td>
                  </tr>
              })}
              {!data.length>0 && <tr><td colSpan="5" className='text-center'>No Data Available</td></tr>}
            </table>
          </div>
        </div>
        {/* Post */}
        <div className='w-1/3'>
          <h3 className='w-full flex justify-center items-center border-b mb-3'><span className='font-bold'>C</span><span>reate Data</span></h3>
          <form onSubmit={handleSubmit}>
            <label>
              Person Name:
              <input type="text" name="name" className='h-12 leading-[20px] w-full  outline-none border py-[4px] pl-[10px] leading-[18px]' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)} />
            </label><br/>
            <br/>
            <label>
              User Name:
              <input type="text" name="userName" className='h-12 leading-[20px] w-full  outline-none border py-[4px] pl-[10px] leading-[18px]' placeholder='Enter User Name' value={userName} onChange={(e)=>setUserName(e.target.value)} />
            </label><br/>
            <br/>
            <label>
              Email ID:
              <input type="text" name="email" className='h-12 leading-[20px] w-full  outline-none border py-[4px] pl-[10px] leading-[18px]' placeholder='Enter Email ID' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </label><br/>
            <br/>
            <div className='flex justify-center border p-[3px]'>
                <button type="submit" className='bg-black text-white w-[100px] my-2 h-[30px] rounded-full'><span className='font-bold'>P</span>ostData</button>
            </div>
          </form>
        </div>
       </div>
      </div>
      </>
    )
}

export default ApiComp;