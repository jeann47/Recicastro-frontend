import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { format, parseISO } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import { ptBR } from 'date-fns/locale';
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

export default function DenseTable({ rows, onEdit }) {
  // const [editing, setEditing] = React.useState(null);
  const dispatch = useDispatch();
  const deletes = (item) => {
    dispatch(deleteCaixa(item));
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Mês</TableCell>
            <TableCell>Salario</TableCell>
            <TableCell>Extras</TableCell>
            <TableCell>Gastos</TableCell>
            <TableCell>Restante</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                {format(parseISO(row.createdAt), 'MMMM', { locale: ptBR })}
              </TableCell>
              <TableCell component="th" scope="row">
                R$ {row.payment ? row.payment.toFixed(2) : 0}
              </TableCell>
              <TableCell>R$ {row.extras ? row.extras.toFixed(2) : 0}</TableCell>
              <TableCell style={{ color: row.spent !== 0 ? 'red' : null }}>
                R$ {row.spent.toFixed(2)}
              </TableCell>
              <TableCell
                style={{
                  color:
                    row.payment + row.extras - row.spent < 0 ? 'red' : null,
                }}
              >
                R${' '}
                {(row.payment + row.extras - row.spent).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  style={{
                    width: onEdit ? `${30}%` : `${100}%`,
                    border: 'none',
                    background: 'none',
                  }}
                  aria-label="delete"
                  onClick={() => deletes(row._id)}
                >
                  <Delete style={{ color: '#000' }} />
                </IconButton>
                {onEdit ? (
                  <IconButton
                    style={{
                      border: 'none',
                      width: `${30}%`,
                      background: 'none',
                      marginLeft: `${20}px`,
                    }}
                    aria-label="edit"
                    onClick={() => onEdit(row)}
                  >
                    <Edit style={{ color: '#000' }} />
                  </IconButton>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
