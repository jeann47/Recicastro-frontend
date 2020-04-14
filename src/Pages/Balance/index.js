import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Form, Input, Select } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Check, Close} from '@material-ui/icons';
import Table from '~/Components/Table'
import { Container, FormContainer, SendBtn, Button } from './styles';

import {addStorage} from '~/store/modules/Stored/actions'

import {getEmployee} from '~/store/modules/Employees/actions'
import {getMats} from '~/store/modules/Mats/actions'
import {getStorage, deleteStorage, updateStorage} from '~/store/modules/Stored/actions'


export default function Balance() {
    const dispatch = useDispatch()
    const storage = useSelector(state => state.Storage.storages)
    const mats = useSelector((state) => state.mats.materials);
    const emps = useSelector((state) => state.employees.employees);
    const [date, setDate] = useState(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()))
    const [sold, setSold] = useState(false)
    useEffect(() => {
    dispatch(getStorage())
    dispatch(getEmployee())
    dispatch(getMats())
}, [])
    const table = useMemo(() => 
        storage && mats ? storage.map(store => {
            const buy_price = store.material.buy_price
            const sell_price = store.material.sell_price
            const brute = (sell_price - buy_price) * store.amount
            const liquid = brute - (store.workflow.employee.salary / 4)
            return {
                in_out: true,
                id: store.id,
                material: store.material.name,
                amount: store.amount,
                buy_price,
                sell_price,
                brute,
                liquid,
                sold: store.sold ? <Check/> : <Close/>,
                created_at: store.createdAt
            }
        }) : null
    [storage])

  const heads = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Nome',
    },
    {
      id: 'amount',
      numeric: true,
      disablePadding: false,
      label: 'Quantidade',
    },
    {
      id: 'buy_price',
      numeric: true,
      disablePadding: false,
      label: 'Compra',
    },
    { 
      id: 'sell_price',
      numeric: true,
      disablePadding: false,
      label: 'Venda',
    },
    {
      id: 'brute',
      numeric: true,
      disablePadding: false,
      label: 'Bruto',
    },
    { 
      id: 'liquid',
      numeric: true,
      disablePadding: false,
      label: 'Liquido',
    },
    { 
      id: 'sold',
      numeric: true,
      disablePadding: false,
      label: 'Vendido',
    },
    { 
      id: 'created_at',
      numeric: true,
      disablePadding: false,
      label: 'Data',
    },
]

const options = React.useMemo(
    () =>
        mats ? mats.map(mat => {
        return {
            id: mat.id,
            title: mat.name
        }
        }) : null
    [mats]
);
const funcs = React.useMemo(
    () =>
        emps ? emps.map(emp => {
        return {
            id: emp.id,
            title: emp.name,
        }
        }) : null
    [mats]
);

function handleSubmit({material_id, amount, employee_id}){
    // console.tron.log(material_id, amount, employee_id, sold)
    dispatch(addStorage(material_id, amount, employee_id, date, sold))
}

function handleUpdate(item) {
    dispatch(updateStorage(item, true))
}

  return (
    <Container >
        <Table rows={table} headCells={heads} tabTitle='Estoque' deleteAction={deleteStorage} unique={handleUpdate}/>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <span>Adicionar</span>
            <div style={{marginTop: 10 + 'px'}}/>
            <Select name='material_id' placeholder='Material' options={options}/>
            <hr />
            <Input name="amount" placeholder="Quantidade" />

            <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                <KeyboardDatePicker
                    autoOk
                    placeholder="ex: DD/MM/AAAA"
                    format="dd/MM/yyyy"
                    ampm={false}
                    invalidDateMessage="Data em formato inválido."
                    cancelLabel="Cancelar"
                    value={date}
                    onChange={setDate}
                />
            </MuiPickersUtilsProvider>
            <Select name='employee_id' placeholder='Funcionário' options={funcs}/>
            <div>  
            <FormControlLabel
                control={<Checkbox icon={<Close />} checked={sold} onChange={() => setSold(!sold)} checkedIcon={<Check />} name="sold" />}
                label="Vendido"
            />          
              <SendBtn width={'100%'} type="submit">Salvar</SendBtn>
            </div>
          </Form>
          <div style={{marginTop: 10 + 'px'}}/>
          <Link to='/'>
            <Button>Caixa</Button>
          </Link>
              <Link to="/mats">
                <Button type="submit" color='#0022ff'>Materiais</Button>
              </Link>
              <Link to="/func">
                <Button type="submit" color='#000'>Funcionários</Button>
              </Link>
        </FormContainer>
    </Container>
  );
}
