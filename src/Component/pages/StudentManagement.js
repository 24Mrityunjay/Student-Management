import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import moment from 'moment';
import { Link } from 'react-router-dom';

const StudentManagement = () => {
    const [students, setStudent] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        loadStudents();
    }, [])

    const deleteStudent = id => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3001/students/${id}`, requestOptions)
            .then(response => response.json())
        setTimeout(() => {
            loadStudents()
        }, 200);

    }

    const loadStudents = () => {
        fetch('http://localhost:3001/students')
            .then(response => response.json())
            .then(data => setStudent(data))
    }

    const createCopy = data => {
       students.splice(data.index+1,0,data.original)
            
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                maxWidth: 600
            },

            {
                Header: 'Date Of Birth',
                accessor: d => {
                    return moment(d.dob)
                        .local()
                        .format("DD-MMM-YYYY")
                },
                maxWidth: 200
            },
            {
                Header: 'Age Years',
                accessor: 'age',
                width: 200,
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                width: 200,
            },
            {
                Header: 'Action',
                Cell: row => (
                    <div>
                        <Link className="btn btn-outline-primary " to={`/student/edit/${row.row.original.id}`}>Edit</Link>&nbsp;
                        <Link className="btn btn-danger " onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteStudent(row.row.original.id) } }>Delete</Link>&nbsp;
                        <Link className="btn btn-warning" onClick={(e) => { createCopy(row.row) }}>Copy</Link>
                    </div>
                ),
                width: 200,
            }
        ]
    )
   

    function Table({ columns, data }) {
        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
            pageOptions,
            setGlobalFilter,
            canPreviousPage,
            canNextPage,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize, globalFilter },
        } = useTable({
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10, pageCount: 10000, canNextPage: true, canPreviousPage: false },
        },
            useGlobalFilter,
            useSortBy,
            usePagination
        )
        const firstPageRows = page.slice(0, 500)

        // Render the UI for your table
        return (
            <div>
                <br />
                <br />
                <h4>Search</h4>
                <input
                    type="text"
                    value={globalFilter || ""}
                    onChange={e => setGlobalFilter(e.target.value)}
                />
                <br />
                <br />
                <table className="table table-striped" {...getTableProps()}>
                    <thead className="thead-dark">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    // Add the sorting props to control sorting. For this example
                                    // we can add them into the header props
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {/* Add a sort direction indicator */}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="table" {...getTableBodyProps()}>
                        {firstPageRows.map(
                            (row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} >
                                        {row.cells.map(cell => {
                                            return (
                                                <td style={{color: isNaN(cell.value) ? "" : cell.value < 10  ? "red":"black"}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
                <div className="pagination" >
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}&nbsp;
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}&nbsp;
        <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}&nbsp;
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}&nbsp;
        <span >
                        Page{' '}
                        {/* <strong> */}
                        {pageIndex + 1} of {pageOptions.length}
                        {/* </strong>{' '} */}
                    </span>
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;  Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 1
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }

    const handleChange = event => {
        setSearchInput({ searchInput: event.target.value })
        let filteredData = students.filter(value => {
            return (
                value.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
        });
        setStudent({ students: filteredData });
    }; 
    
    return (
        <div className="container">
            <Table columns={columns} data={students} />
        </div>
    )
}

export default StudentManagement;