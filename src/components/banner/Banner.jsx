import { Box,Typography,styled } from "@mui/material";

const Image=styled(Box)`
background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg);
width:100%;
height:50vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`


const Heading=styled(Typography)`
font-size:70px;
color:#ffffff;
Line-height:1`;

const SubHeading=styled(Typography)`
font-size:20px;
background:#ffffff `

const Banner=()=>{
    return(
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>CODE FOR US</SubHeading>
        </Image>
    )
}

export default Banner;