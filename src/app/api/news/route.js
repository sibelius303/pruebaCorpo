import { NextResponse } from "next/server";

/*
    API de Noticias
    Method: POST
    URL: https://www.lightsoftwareca.com/sipolnab/qa/api/api/invoke
    Body:
    {
        "func":"Z2V0bm90aWNldG9w",
        "json":"eyJ0b3AiOjR9"
    }
*/

export async function GET(){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch("https://www.lightsoftwareca.com/sipolnab/qa/api/api/invoke",{
        method: "post",
        headers,
        body: JSON.stringify({
            "func" : "Z2V0bm90aWNldG9w",
            "json" : "eyJ0b3AiOjR9"
        })
    })
    const { data } = await response.json()
    /*
        Array =>
            _id
            title
            contentHTML
            descrip
            typeNotice
            status
            urlImage
            createdAt
            updatedAt
            __v
    */

    return NextResponse.json(data)
}