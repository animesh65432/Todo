import axios from "axios"
async function gettodaytodos (){
    try {
        let resposnse  = await axios.get("http://localhost:5000/api/Todo/Today")
        console.log(resposnse)
        return resposnse?.data?.Todos
    } catch (error) {
        return error
        
    }

}

async function addtodo ({title} :{title : string}){
    try {
        let resposnse = await axios.post("http://localhost:5000/api/Todo/create",{title})
        return resposnse?.data
    } catch (error) {
        console.log(error)
        return error
        
    }
}


const doneTodo  = async ({id} : {id : string})=>{
    try {
        let resposnse = await axios.put("http://localhost:5000/api/Todo/doneTodo",{id})
        console.log(resposnse)
        return resposnse?.data?.Todos
    } catch (error) {
        console.log(error)
        return error
    }
}

const getTodosLast7Days = async ()=>{
    try {
        let resposnse = await axios.get(`http://localhost:5000/api/Todo/Lastsevendays`)
        return resposnse?.data?.Todos?.Todos
    } catch (error) {
        return error
        
    }
}

const getlstTwoDays = async ()=>{
    try {
        let response = await axios.get(`http://localhost:5000/api/Todo/Yesterday`)
        return response?.data?.Todos
    } catch (error) {
        return error
        
    }
}

const getspecificDay = async ({ startday, endday,page ,limit  }: { startday: Date | null, endday: Date | null ,page : number,limit : number}) => {
 try {

    console.log("Clicked")
        if (!startday || !endday) {
            throw new Error("Start and end dates must be provided.");
        }

        console.log(startday, endday, "start and end dates in clinet side");
        let startDate = startday?.toISOString().split('T')[0];
        let endDate = endday?.toISOString().split('T')[0];
        
        const response = await axios.get(`http://localhost:5000/api/Todo/GetTodosDays?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
        console.log(response)
        console.log( response?.data?.Todos?.Todos)
        const Todos =  response?.data?.Todos?.Todos
        console.log("Orginal todos",Todos)

        return Todos
    } catch (error) {
        console.log(error);
        return error;
    }
}


export {addtodo,doneTodo,getTodosLast7Days,getlstTwoDays,gettodaytodos,getspecificDay}