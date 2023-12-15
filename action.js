'use server'
import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from "next/headers"


const urlBase = process.env.API_URL

export const setUser = (user) => {
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    cookies().set("user", JSON.stringify({
        ...user,
        expirationDate: expires
    }), {
        expires: expires
    });
}

export const loginResponse = async (valores,config) =>{
    try {
        const { data } = await axios.post(`${urlBase}/login`, valores, config);
        console.log(data)
      if (data) {
        setUser(data);
        return true
      }
    } catch (error) {
        return false
  }}

export async function login(obj) {
    let config = {
      auth: {
        username: process.env.TOKEN_PROD,
        password: ''
      }
    };
    let valores = {
            user: obj.get('user'),
            passW: obj.get('passW')
        }
    if(loginResponse(valores,config)){
        redirect('/Home')
    } else {
        console.log('Ha habido un error');
    }
  }

  export const getUser = () => {
    const user = cookies().get("user");
    console.log(user)
    return user?.value ? JSON.parse(user.value) : false;
}




export async function GetListUsers() {
  let config = {
    auth: {
      username: UserDataJson?.token,
      password: ''
    }
  };
  let valores = {
    id: 0,
    idType: 0,
    Search: ""
  }

  try {
    const { data } = await axios.post(`${urlBase}/user/getlist`, valores, config);
    return data.data; 
  } catch (error) {
    throw error; 
  }
}