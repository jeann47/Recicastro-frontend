/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Delete, Edit,Visibility  } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {format, parseISO} from 'date-fns'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    headCells,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const dispatch = useDispatch();
  const classes = useToolbarStyles();
  const { numSelected, items, setSelected, deleteAction, unique, third } = props;

  const deletes = (i) => {
    i.map((item) => dispatch(deleteAction(item)));
    setSelected([]);
  };
  const other = (i) => {
    i.map((item) => unique(item));
    setSelected([]);
  };

  const other2 = (i) => {
      i.map((item) => third(item));
      setSelected([]);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {props.tableTitle}
        </Typography>
      )}

      {numSelected > 0 ? numSelected > 1 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => deletes(items)}>
              <Delete />
            </IconButton>
          </Tooltip>
        ) : (
        <>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => deletes(items)}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => other(items)}>
              <Edit />
            </IconButton>
          </Tooltip>
          {third ? (
            <Tooltip title="Open">
                <IconButton aria-label="open" onClick={() => other2(items)}>
                <Visibility />
                </IconButton>
            </Tooltip>
          ):null}
        </>
        ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  tableTitle: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ rows, headCells, ord='name', tabTitle, unique, deleteAction, third }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState(ord);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
            third={third}
            unique={unique}
            deleteAction={deleteAction}
            numSelected={selected.length}
            tableTitle={tabTitle}
            items={selected}
            setSelected={setSelected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              headCells={headCells}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                  <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                ><TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
                  {Object.entries(row).map(item => (
                    item[0] === 'id' || item[0] === 'in_out' ? 
                      null : 
                      <TableCell style={
                        {color:  
                            (
                            item[0] === 'brute' ||
                            item[0] === 'liquid' ||
                            item[0] === 'total'
                            ) && !row.in_out ?
                            'red' : 'black'
                        }} align={item[0] === headCells[0].id ? 'left': 'right'}>
                        {
                          (typeof item[1]) === 'object' ? (item[1]) : item[0] === 'created_at' || 
                          item[0] === 'updated_at' || 
                          item[0] === 'createdAt' ||
                          item[0] === 'date' ||
                          item[0] === 'updatedAt' ? 
                          format(parseISO(item[1]),'dd/MM/yyyy') : 
                          (
                              item[0] === 'price' ||
                              item[0] === 'buy_price' ||
                              item[0] === 'sell_price' ||
                              item[0] === 'brute' ||
                              item[0] === 'liquid' ||
                              item[0] === 'salary' ||
                              item[0] === 'total' ?
                               'R$ ': '') + (typeof item[1] === 'number' ? item[1].toFixed(2) : item[1])
                        }
                      </TableCell>
                  ))}</TableRow>
                )
                  
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Expandir"
      />
    </div>
  );
}
