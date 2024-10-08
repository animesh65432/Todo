import  {NextResponse} from "next/server"

export const GET = async ()=>{
    try {
        return NextResponse.json({
            messaeg : "Hello from api"
        },{
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