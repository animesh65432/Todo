
import { backendurl } from "@/service"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async(request: NextRequest) => {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({
        message: "id is required"
      }, {
        status: 400
      })
    }
    console.log("Updating todo with id:", id)
    let response = await axios.put(`${backendurl}/doneTodo`, { id })

    return NextResponse.json({
      message: "Todo updated successfully",
      data: response.data
    }, {
      status: 202
    })
  } catch (error) {
    console.error("Error updating todo:", error)
    return NextResponse.json({
      message: "Internal server error"
    }, {
      status: 500
    })
  }
}