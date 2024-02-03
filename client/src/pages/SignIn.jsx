import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"

export default function SignIn() {
  const [formdata,setFormData] = useState({})
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  function changeHandler(e){
    setFormData({...formdata,[e.target.id]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault();
    
    try{
      setLoading(true)
      setError(false)
      let response = await fetch("/api/auth/signin",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formdata)
      })
  
      response = await response.json()
      setLoading(false)
      if(response.status === false){
        setError(true)
        return
      }

      navigate("/")
      
    }catch(error){
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3'>

      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="email" id="email" placeholder='Email' className='bg-slate-100 p-3 rounded-lg' onChange={changeHandler}/>

        <input type="password" id="password" placeholder='Password' className='bg-slate-100 p-3 rounded-lg' onChange={changeHandler}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?"Loading...":"Sign In"}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account ?</p>
        <Link to="/signup">
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>

      <p className="text-red-700 mt-5">{error && "Something went wrong !"}</p>

    </div>
  )
}