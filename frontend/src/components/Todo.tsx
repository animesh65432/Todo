import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doneTodo, getspecificDay } from "../service/client";
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Todo {
    id: string;
    title: string;
    done: boolean;
}

const Todo: React.FC = () => {
    const queryClient = useQueryClient();
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const [page, setpage] = useState(0)
    const limit = 2;

    const { data: todos, isError, isLoading } = useQuery<Todo[]>({
        queryKey: ["todos", dateRange.startDate, dateRange.endDate, page],
        queryFn: async () => {
            console.log("Fetching todos for:", dateRange.startDate, dateRange.endDate);
            return getspecificDay({
                startday: dateRange.startDate || null,
                endday: dateRange.endDate || null,
                page,
                limit
            });
        },
        enabled: !!dateRange.startDate && !!dateRange.endDate,
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["todos"],
        mutationFn: doneTodo,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const handledone = (id: string) => {
        mutate({ id });
    };

    const handleDateRangeChange = (item: any) => {
        setDateRange(item.selection);

    };


    const gotoNextPage = () => {
        console.log(page)
        setpage(page + 2)
    }

    const gotoThePreviousPage = () => {
        if (page === 0) return
        setpage(page - 2)
    }

    console.log(`${dateRange.startDate}-it's statrtdate`, `${dateRange.endDate}-its end date`, isLoading);

    if (isLoading) return <p className="text-gray-600">Loading todos...</p>;
    if (isError) return <p className="text-red-500">Error loading todos.</p>;

    return (
        <>
            <div className="mb-4">
                <DateRange
                    ranges={[dateRange]}
                    onChange={handleDateRangeChange}
                    months={1}
                    direction="vertical"
                    showDateDisplay={true}
                    className="border rounded shadow-md"
                />
            </div>

            <div className="mt-4">
                {todos && todos.length > 0 ? (
                    <div className="space-y-2">
                        {todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`flex justify-between items-center bg-white border border-gray-300 p-4 rounded-lg shadow-md transition transform hover:scale-105 text-zinc-800 ${todo.done ? 'bg-slate-600' : ''}`}
                            >
                                <span className={`flex-1 ${todo.done ? 'line-through text-gray-500' : ''}`}>{todo.title}</span>
                                <button
                                    className='bg-green-600 rounded-lg p-2 ml-4 hover:bg-green-800 text-slate-100'
                                    onClick={() => handledone(todo.id)}
                                    disabled={isPending}
                                >
                                    {todo.done ? 'DONE' : 'MARK DONE'}
                                </button>
                            </div>
                        ))}
                        <div className='flex justify-between mt-4 gap-4'>
                            <button
                                onClick={gotoThePreviousPage}
                                className='bg-green-600 rounded-lg p-2 text-white hover:bg-green-700 transition duration-200 disabled:opacity-50'
                                disabled={page === 0}
                            >
                                Previous
                            </button>
                            <button
                                onClick={gotoNextPage}
                                className='bg-green-600 rounded-lg p-2 text-white hover:bg-green-700 transition duration-200'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No todos available.</p>
                )}
            </div>
        </>
    );
};

export default Todo;