import { useState } from 'react'
import { toast } from 'react-toastify';
const usePasswordGenerator = () => {
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const generatepassword = (checkvalue, passwordlength) => {
        if (passwordlength < 8 || passwordlength > 50) {
       
           
            toast.warning("Length should be between 8-50 !", {
                position: "top-center",
                autoClose: 1400
            });
            return
        }
        let charset = "", generatedpass = "";
        let selectedoption = checkvalue.filter((checks) => checks.state)
        if (selectedoption.length === 0) {
            // alert("please sekect atleast one option");
            toast.warning("please select atleast one option !", {
                position: "top-center",
                autoClose: 1400
            });
            setPassword('')
            return
        }
        selectedoption.forEach((itemp) => {
            switch (itemp.title) {
                case "Include lowercase letters":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include uppercase letters":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include numbers":
                    charset += "0123456789";
                    break;
                case "Include symbols":
                    charset += "!@#$%^&*()";
                    break;
                default:
                    break;
            }

        })
        for (let i = 0; i < passwordlength; i++) {
            let randompi = Math.floor(Math.random() * charset.length);
            generatedpass += charset[randompi];
        }
        setPassword(generatedpass);

    }
    return { password, generatepassword }


}
export default usePasswordGenerator;