import React,{useState} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg'
const cookies = new Cookies();
const initialState = {
    fullName:'',
    userName:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    avtarURL:''
}
const Auth = () => {
    const [form,setForm] = useState(initialState);
    const [isSignup, setisSignup] = useState(false);
    const handleChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
            console.log(form);
       
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {fullName,userName,password,phoneNumber,avtarURL} = form;
        const URL ='http://localhost:5000/auth';
        const {data:{token,userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,
        {
            userName,password,fullName,phoneNumber,avtarURL
        });
        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
        if(isSignup){
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avtarURL', avtarURL);
        cookies.set('hashedPassword', hashedPassword);
        }
        window.location.reload();
    };
    const switchMode = () =>{
        setisSignup(isSignup?(false):(true))
    }
    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
            <p>{isSignup? 'Sign Up' : "Sign In"}</p>
            <form  onSubmit={handleSubmit}>
                {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='fullName'>Full Name</label>
                        <input name="fullName" type="text" 
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                         />
                    </div>
                )}
                <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='userName'>UserName</label>
                        <input name="userName" type="text" 
                        placeholder="Username"
                        onChange={handleChange}
                        required
                         />
                    </div>

                {isSignup && (
                <div className='auth__form-container_fields-content_input'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input name="phoneNumber" type="text" 
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                        />
                </div>
                )}
                {isSignup && (
                <div className='auth__form-container_fields-content_input'>
                    <label htmlFor='avtarURL'>AvtatURL</label>
                    <input name="avtarURL" type="text" 
                    placeholder="AvtatURL"
                    onChange={handleChange}
                    required
                        />
                </div>
                )}
                <div className='auth__form-container_fields-content_input'>
                    <label htmlFor='password'>Password</label>
                    <input name="password" type="password" 
                    placeholder="Password"
                    onChange={handleChange}
                    required
                        />
                </div>
                {isSignup && (
                <div className='auth__form-container_fields-content_input'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input name="confirmPassword" type="password" 
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                        />
                </div>
                )}
                <div className='auth__form-container_fields-content_button'>
                    <button>
                        {isSignup? 'signUp': 'signIn'}
                    </button>
                </div>
            </form>
            <div className='auth__form-container_fields_account'>
            <p>
                {isSignup ? "Already have an Account?" : "Don't have an account?"}
                <span onClick={switchMode}>
                    {isSignup ? "signin" : "signup"}
                </span>
            </p>
            </div>
            </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signinImage} alt="signin" />
            </div>
        </div>
    )
}

export default Auth
