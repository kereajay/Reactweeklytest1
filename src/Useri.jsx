
import { useState } from 'react'
import usePasswordGenerator from './Hooks/Passwordgenerator';
import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import usePasswordGenerator from './Hooks/Passwordgenerator';
let Useri = () => {
   

    const [passwordlength, setPasswordlength] = useState(8);
    const [checkvalue, setCheckvalue] = useState([
        { title: "Include lowercase letters", state: false, },
        { title: "Include uppercase letters", state: false, },
        { title: "Include numbers", state: false, },
        { title: "Include symbols", state: false, },

    ])
    const [copied,setCopied]=useState(false)
    const { password, generatepassword ,} = usePasswordGenerator();


    const handlecheckvalue = (index) => {
        let updatedcheckvalue = [...checkvalue];
        updatedcheckvalue[index].state = !updatedcheckvalue[index].state;
        setCheckvalue(updatedcheckvalue);


    }
    const handlecopy=()=>{
        if(!password){
          
            toast.warning("please generate password first", {
                position: "top-center",
                autoClose: 1400
            })
            return
        }
        navigator.clipboard.writeText(password);
        setCopied(true)
       
        setTimeout(()=>{
             setCopied(false)
        },1000)
        toast.success("congrats your password is copied", {
            position: "top-center",
            autoClose:1400
        })
       
    }

    return (
        <>
            {/* {password && ( */}
            <div className='flex flex-row m-auto p-2'>
                <div className='border-2 border-black h-8 w-[95%]' ><p>{password}</p></div>
                <button className=' bg-blue-300 p-1 rounded' onClick={()=>handlecopy()} >{copied?"Copied":"copy"}</button>

            </div>
            {/* )} */}
            <div className='p-2'>
                <p>Select Password length <b> (**8-50 characters**)</b></p>
                <br />
                <input type="number" min={8} max={50} value={passwordlength} className='border-2  border-black w-32' onChange={(e) => setPasswordlength(e.target.value)} />
            </div>
            {
                checkvalue.map((value, idx) => {
                    return (
                        <div className='p-2' key={idx}>
                            <input type="checkbox" onChange={() => handlecheckvalue(idx)} checked={value.state} />
                            <label>{value.title}</label>
                        </div>
                    )
                })
            }

            <button className='p-4 bg-green-300 rounded ml-2 text-xl ' onClick={() => generatepassword(checkvalue, passwordlength)}>Generate password</button>


        </>
    )
}
export default Useri;
