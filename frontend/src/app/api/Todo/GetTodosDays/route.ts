import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest) => {
    try {
        
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');

        const response = await axios.get(`http://localhost:3000/GetTodosdays?startDate=${startDate}&endDate=${endDate}&&skip=${page}&take=${limit}`);

        if (response.status !== 200) {
            return NextResponse.json({ message: "Todos not found." }, { status: 404 });
        }
        return NextResponse.json({ Todos: response.data }, { status: 200 });

    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json({ message: "Failed to fetch todos." }, { status: 500 });
    }
};