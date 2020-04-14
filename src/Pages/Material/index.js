import React, {useState, useEffect} from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '~/Components/Table'
import { Container, FormContainer, SendBtn, Button } from './styles';
import {deleteMaterial, addMaterial, updateMaterial} from '~/store/modules/Mats/actions'

import {getMats} from '~/store/modules/Mats/actions'

export default function Material() {
    const dispatch = useDispatch()
    const table = useSelector((state) => state.mats.materials);
    const [editing, setEdition] = useState({})
    const [update, setForm] = useState(false)

    useEffect(() => {
        dispatch(getMats())
    }, [])

  const heads = [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nome',
      },
      { 
        id: 'type',
        numeric: true,
        disablePadding: true,
        label: 'Tipo'
      }, 
      {
        id: 'buy_price',
        numeric: true,
        disablePadding: false,
        label: 'Preço de compra',
      },
      { 
        id: 'sell_price',
        numeric: true,
        disablePadding: false,
        label: 'Preço de venda',
      },
      { 
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Estoque (Kg)',
      },
      { 
        id: 'updated_at',
        numeric: true,
        disablePadding: false,
        label: 'Data',
      },
  ]

  function handleSubmit({ name, type, sell_price}) {
      if(update) {
          const id = editing.id
            dispatch(updateMaterial(id, name, type, sell_price))
      } else {
            dispatch(addMaterial(name, type, sell_price))
      }
        // document.location.reload() 
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
        <Table rows={table} headCells={heads} tabTitle='Histórico' deleteAction={deleteMaterial} unique={handleEdit}/>
        <FormContainer>
          <Form onSubmit={handleSubmit} initialData={editing}>
            <span>Adicionar</span>
            <Input name="name" placeholder="Nome" />
            <Input  name="type" placeholder="Tipo" />
            <hr />
            <Input name="sell_price" placeholder="Preço de venda" />
              <SendBtn width={'100%'} type="submit">Salvar</SendBtn>
          </Form>
          <div style={{marginTop: 10 + 'px'}}/>
            <Link to='/balance'>
                <Button>Estoque</Button>
            </Link>
            <Link to="/func">
                <Button color='#000'>Funcionários</Button>
            </Link>
            <Link to="/">
                <Button color='#0072b0'>Caixa</Button>
            </Link>
            
        </FormContainer>
    </Container>
  );
}
