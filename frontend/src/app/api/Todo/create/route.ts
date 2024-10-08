import { NextRequest, NextResponse } from "next/server";
import {backendurl} from "../../../../service/index"
import axios from "axios";

export const POST = async (request: NextRequest) => {
    try {
        const { title } = await request.json();


        if (!title) {
            return NextResponse.json({ error: "title is required." }, { status: 400 });
        }

        console.log(backendurl)

        const resposnse = await axios.post(`${backendurl}/create`,{title})

        console.log(resposnse)

        return NextResponse.json({ status: 201,
            data : resposnse.data
         });
    } catch (error) {
        console.error("Error adding todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
