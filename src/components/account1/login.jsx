import {useState,useContext} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, styled, Typography} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import {API} from '../../service/api'
import { DataContext } from '../../context/DataProvider';
const Component=styled(Box)`
    width:400px;
    margin : auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6); `
;

const Image=styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 0 ',
})

const Wrapper=styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div,& > button,  & > p{
    margin-top:20px}
`

const LoginButton=styled(Button)`
text-transform:none;
background: #FB641B;
color:#ffff;
height:48px;
border-radius:2px; 
`;

const SignupButton=styled(Button)`
text-transform:none;
background: #fff;
color:#2874f0;
height:48px;
border-radius:2px; 
box-shadow: 0 2px 4px 0 rgb (0 0 0 / 20%);
`;


const Error=styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
    `
const Text=styled(Typography)`
color:#878787; 
font-size: 16px;`


const loginInitialValues={
    username:'',
    password:''
}

const signupInitialValues={
    name:'',
    username:'',
    password:''
}

const Login=({isUserAuthenticated}) => {

    const[account,toggleaccount]=useState ( 'login');
    const[signup,setSignup]=useState(signupInitialValues)
    const[error,setError]=useState('');
    
    const{setAccount}=useContext(DataContext)
    const navigate=useNavigate();
    const[login,setLogin]=useState(loginInitialValues)
    const toggleSignup=()=>{
        account==='signup' ? toggleaccount('login'):
        toggleaccount('signup');
    }

    const onInputChange=(e)=>{
        setSignup({...signup, [e.target.name]:e.target.value});

    }

    const signUpuser=async()=>{
        try{
        let response=await API.userSignup(signup)
        console.log(response);
        if (response.isSuccess){
            setSignup(signupInitialValues)
            toggleaccount('login')
        } else{
            setError('something went wrong')
        }
    }catch(error){
        setError("something went wrong.")
    }
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const loginUser=async()=>{
        let response=await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);

            setAccount({username:response.data.username,name:response.data.name});
            
            isUserAuthenticated(true);

            navigate('/');
        
        }else{
            setError('something went wrong please try again later');
        }
    }

    return(
        <Component>
            <Box>
            <Image src='https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png' />
            {
                account==='login' ?
                    <Wrapper>
                    <TextField id="username" value={login.username} label="Enter username" variant="standard" onChange={onValueChange}  name='username'/>
                    <TextField id="password" value={login.password} label="Enter password" variant="standard" onChange={onValueChange}  name='password'/>

                    {error && <Error>{error}</Error>}
                    <LoginButton onClick={()=>loginUser()}variant="contained">login</LoginButton>
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <SignupButton variant="text" onClick={()=>toggleSignup()}>Create new account</SignupButton>
                    
                    </Wrapper>
            :

                    <Wrapper>
                        <TextField id="name" label="Enter name" variant="standard" onChange={onInputChange}  name='name'/>
                        <TextField id="username" label="Enter username" variant="standard" onChange={onInputChange}  name='username'/>
                        <TextField id="password" label="Enter password" variant="standard" onChange={onInputChange}  name='password'/>

                        
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={()=>signUpuser()}>SignUp</SignupButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
                        
                    </Wrapper>
}
            </Box>
        </Component>
    )
}

export default Login;