import { backendurl } from "@/service"
import axios from "axios"
import {NextResponse} from "next/server"


export const GET = async()=>{
    try {
        const resposnse = await axios.get(`${backendurl}/Get`)
        return NextResponse.json({
            Todo: resposnse?.data
        },
        {
            status : 200
        })

    } catch (error) {
        return NextResponse.json({
            message : "internal server error"
        },{
            status : 500
        })
        
    }
}