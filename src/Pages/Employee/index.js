import React, {useState, useEffect, useMemo} from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '~/Components/Table'
import { Container, FormContainer, SendBtn, Button, EmpContainer } from './styles';
import {addEmployee, updateEmployee, deleteEmployee} from '~/store/modules/Employees/actions'
import history from '~/Services/history'
import {getEmployee} from '~/store/modules/Employees/actions'

export default function Employee() {
    const dispatch = useDispatch()
    const [editing, setEdition] = useState({})
    const [update, setForm] = useState(false)
    const emps = useSelector((state) => state.employees.employees);
    

    useEffect(() => {
        dispatch(getEmployee())
    }, [])
    const table = useMemo(
        () =>
            emps ? emps.map(emp => {
            const days = emp.workflows.filter(day => !day.paid).length
            return {
                id: emp.id,
                name: emp.name,
                salary: emp.salary,
                unpaid: days, 
                total: days * emp.salary,
                in_out: true
            }
            }) : null
        [emps]
    );
    const heads = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Nome',
        },
        { 
            id: 'salary',
            numeric: true,
            disablePadding: true,
            label: 'Salário'
        }, 
        {
            id: 'unpaid',
            numeric: true,
            disablePadding: false,
            label: 'Dias a pagar',
        },
        {
            id: 'total',
            numeric: true,
            disablePadding: false,
            label: 'Valor total',
        },
    ]
    
    function handleSubmit({name, salary}) {
        if(update) {
            const id = editing.id
            dispatch(updateEmployee(id, name, salary))
        } else {
            dispatch(addEmployee(name, salary))
        }
        //   document.location.reload() 
    }

    const handleManage = (item) => {
        emps.map(emp => {
            if(emp.id === item) {
                history.push('/workflow', {item, name: emp.name})
            }
        })
    }

    return(
    <Container>
        <EmpContainer>
            {emps.map(emp => {
                return (
                    <button key={emp.id} onClick={() => {
                        setEdition(emp)
                        setForm(true)
                    }}>
                        <h4>{emp.name}</h4>
                        <h4>R$ {emp.salary}</h4>
                    </button>
                )
            })}
        </EmpContainer>
        <FormContainer>
          <Form onSubmit={handleSubmit} initialData={editing}>
            <span>Adicionar</span>
            <Input name="name" placeholder="Nome" />
            <hr />
            <Input name="salary" placeholder="Salário" />
              <SendBtn type="submit" onClick={() => setForm(false)}>Salvar</SendBtn>
          </Form >
          <div style={{marginTop: 10 + 'px'}}/>
            <Link to='/balance'>
                <Button>Estoque</Button>
            </Link>
            <Link to="/mats">
                <Button color='#0022ff'>Materiais</Button>
            </Link>
            <Link to="/">
                <Button color='#55008a'>Caixa</Button>
            </Link>
        </FormContainer>
        <Table 
            rows={table} 
            headCells={heads} 
            tabTitle='Funcionários' 
            deleteAction={deleteEmployee} 
            unique={handleManage}
        />
    </Container>
    )
}
