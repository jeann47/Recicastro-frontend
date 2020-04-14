import React, {useEffect, useState, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ArrowBack} from '@material-ui/icons'
import {deleteWorkFlow, updateWorkFlow} from '~/store/modules/WorkFlow/actions'
import {getHisWorkflow} from '~/store/modules/Employees/actions'
import history from '~/Services/history'


import Table from '~/Components/Table'
import {Container} from './styles'

export default function WorkFlow({location}) {
    const dispatch = useDispatch()
    const name = location.state.name

    const work = useSelector((state) => state.employees.workflow);

    useEffect(() => {
        dispatch(getHisWorkflow(location.state.item))
    }, [])

    const MHeads = [
        {
            id: 'date',
            numeric: false,
            disablePadding: true,
            label: 'Data',
        },
        { 
            id: 'paid',
            numeric: true,
            disablePadding: false,
            label: 'Pago'
        }, 
        {
            id: 'stored',
            numeric: true,
            disablePadding: false,
            label: 'Produziu (ex:. nº de fardos)',
        },
        {
            id: 'stored_amount',
            numeric: true,
            disablePadding: false,
            label: 'Produção (Kg)',
        },
    ]

    function handlePay(item) {
        dispatch(updateWorkFlow(location.state.item, item, true))
    }
    
    return (
        <Container>
            <button onClick={() => history.push('/func')}><ArrowBack/></button>
            <Table
            rows={work} 
            headCells={MHeads} 
            tabTitle={name} 
            deleteAction={deleteWorkFlow} 
            unique={handlePay}
        />
        </Container>
    )
}
