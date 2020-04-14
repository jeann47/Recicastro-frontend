import React, {useMemo, useEffect} from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '~/Components/Table'
import { Container, FormContainer, SendBtn, Button,BoxContainer, SearchContainer } from './styles';
import {addTransaction, updateTransaction, deleteTransaction} from '~/store/modules/Transactions/actions'

import {getMats} from '~/store/modules/Mats/actions'
import {getTr} from '~/store/modules/Transactions/actions'


export default function Main() {
    const dispatch = useDispatch()
    const mats = useSelector((state) => state.mats.materials);
    const history = useSelector((state) => state.transactions.transactions)
    const [in_out, setType] = React.useState(false)
    const [editing, setEdition] = React.useState({})
    const [update, setForm] = React.useState(false)
    
    useEffect(() => {
        dispatch(getMats())
        dispatch(getTr())
    }, [])
  const heads = [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nome',
      },
      { 
        id: 'price',
        numeric: true,
        disablePadding: true,
        label: 'Preço'
      }, 
      {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Quantidade (Kg ou Unidade)',
      },
      {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total',
      },
      { 
        id: 'note',
        numeric: true,
        disablePadding: false,
        label: 'Anotação',
      },
      { 
        id: 'created_at',
        numeric: true,
        disablePadding: false,
        label: 'Data',
      },
  ]

    const table = useMemo(
        () =>
        {
            return history ? history.all.map(row => {
            const {id, material, in_out, price, amount, note, createdAt} = row
            const {name} = material
            return {
                id,
                name,
                in_out,
                price,
                amount,
                total: row.price * row.amount,
                note,
                created_at: createdAt
            }
            }) : null
        },
        [history]
    );
    const options = React.useMemo(
        () =>
            mats ? mats.map(mat => {
            return {
                id: mat.id,
                title: mat.name,
                price: mat.buy_price
            }
            }) : null
        [mats]
    );

    
  function handleSubmit({name, price, amount, note}) {
    if(update) {
        const id = editing.id
          dispatch(updateTransaction(id, name, in_out, price, amount, note))
    } else {
        dispatch(addTransaction(name, in_out, price, amount, note))
    }
  }
  function handleEdit(item) {
    setForm(!update)
    table.map(mat => {
        if(mat.id === item) {
            setEdition(mat)
        }
    })
}
  return (
    <Container >
        <Table ord='created_at' rows={table} headCells={heads} tabTitle='Caixa' deleteAction={deleteTransaction} unique={handleEdit}/>
        <FormContainer>
          <Form onSubmit={handleSubmit} initialData={editing}>
            <span>Adicionar</span>
            <Select name='name' placeholder='Material' options={options}/>            <hr />
            <Input name="price" placeholder="Preço" />
            <Input name="amount" placeholder="Quantidade" />
            <Input  name="note" placeholder="Anotação" />
            <div>
              <SendBtn type="submit" onClick={() => setType(false)} color='#b30003'>Saida</SendBtn>
              <SendBtn type="submit" onClick={() => setType(true)} color='#00b336' >Entrada</SendBtn>
            </div>
          </Form>
          <div style={{marginTop: 10 + 'px'}}/>
          <Link to='/balance'>
            <Button>Estoque</Button>
          </Link>
              <Link to="/mats">
                <Button type="submit" color='#0022ff'>Materiais</Button>
              </Link>
              <Link to="/func">
                <Button type="submit" color='#2441ff'>Funcionários</Button>
              </Link>
            <BoxContainer>
                <h3>Saldo: <span style={{color: history.sum >= 0 ? 'black' : 'red'}}>R$ {history.sum >= 0 ?  history.sum : -history.sum}</span></h3>
            </BoxContainer>
        </FormContainer>
    </Container>
  );
}
