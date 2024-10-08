import { backendurl } from "@/service"
import axios from "axios"
import {NextResponse} from "next/server"
export const GET = async ()=>{
    try {

        let response = await axios.get(`${backendurl}/GetTodosToday`)


        return NextResponse.json({
            Todos : response?.data
        },{
            status : 200
        })
        
    } catch (error) {

        return NextResponse.json({
            error : "internal server errors"
        },{
            status : 500
        })
        
    }
}