import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Todo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todoData, setTodoData] = useState([]);
    const [updateTodoDataById, setUpdateTodoDataById] = useState(false);

    useEffect(() => {
        const getTodoData = async () => {
            const response = await fetch('http://localhost:8080/todo');
            const data = await response.json();
            setTodoData(data?.data);
        }
        getTodoData();
    }, []);

    const sendTodoData = async (e) => {
        e.preventDefault();
        const data = { title, description };

        try {
            await fetch('http://localhost:8080/todo', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setTitle('');
            setDescription('');
            window.location.reload();
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const deleteTodoData = async (id) => {
        const response = await fetch(`http://localhost:8080/todo/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (data?.data) {
            window.location.reload();
        } else {
            console.log('error: internal server error');
        }
    }

    const updateTodoData = async (id) => {
        const data = { title, description };

        try {
            await fetch(`http://localhost:8080/todo/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setTitle('');
            setDescription('');
            window.location.reload();
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <div>
            <TodoWrapper>
                <Form onSubmit={sendTodoData}>
                    <Header>TODO APP</Header>
                    <Input type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                    <br />
                    <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                    <br />
                    <Submit type="submit" value={updateTodoDataById ? "Update" : "Submit"} />
                </Form>
            </TodoWrapper>

            <div>
                <Table>
                    <thead>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </thead>
                    <tbody>
                      { todoData?.length > 0 && todoData?.map((el, index) => (
                           <tr key={index}>
                              <Td>{el.title}</Td>
                              <Td>{el.description}</Td>
                              <Td>
                                <button 
                                    onClick={() => {
                                      updateTodoData(el._id);
                                      setUpdateTodoDataById(true);
                                      setTitle(el.title)
                                      setDescription(el.description)
                                    }}
                                >
                                    Edit
                                </button>
                              </Td>
                              <Td><button onClick={() => deleteTodoData(el._id)}>Delete</button></Td>
                           </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}


const TodoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  border-radius: 1rem;
  margin: 50px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const Header = styled.h2`
  text-align: center;
`

const Input = styled.input`
  margin-bottom: 6px;
  padding: 10px 15px;
  border-radius: 1rem;
  border: 0.5px solid;
  outline: 1px solid zinc;
  font-size: 16px;
`

const Submit = styled.input`
  width: 100%;
  margin: 8px 0px;
  border: 1px solid;
  border-radius: 1rem;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: 700;

  &:hover {
    background-color: white;
    color: black;
    transition: 0.3s ease-out;
  }
`

const Table = styled.table`
    border: 1px solid #ddd;
    text-align: left;
    border-collapse: collapse;
    width: 70%;
    margin: auto;
    margin-top: 50px;
`

const Th = styled.th`
    border: 1px solid #ddd;
    text-align: left;
    padding: 10px;
    font-size: 18px;
`

const Td = styled.td`
    border: 1px solid #ddd;
    text-align: left;
    padding: 10px;
    font-size: 18px;
`
