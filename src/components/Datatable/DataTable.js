import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Col } from 'reactstrap';
import ToolkitProvider, { Search, ColumnToggle } from 'react-bootstrap-table2-toolkit';


const DataTable = ({ columns, data, defaultSorted }) => {
  const { ToggleList } = ColumnToggle;
  const { SearchBar } = Search;
  const options = {
    custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: data.length
  };
  const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
    sortOrder === 'asc' ? 'demo-sorting-asc' : 'demo-sorting-desc'
  );
  
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      //  console.log(row);
    }
  };
  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.id > 3) {
      style.backgroundColor = '#c8e6c9';
    } else {
      style.backgroundColor = '#00BFFF';
    }
  
    if (rowIndex > 2) {
      style.fontWeight = 'bold';
      style.color = 'white';
    }
  
    return style;
  };
  // const rowStyle = { backgroundColor: '#c8e6c9', height: '70px', fontSize:"100px"};
  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>
      <ToolkitProvider
        keyField="id"
        columns={columns}
        data={data}
        search
      >
        {
          props => (
            <div>
              <hr />
              <SearchBar
                className="col-md-12"
                style={{ width: '300px' }}
                placeholder="Search"
                {...props.searchProps} />
              <BootstrapTable
                classes="table-responsive table-dark table-f"
                keyField="id"
                data={data}
                columns={columns}
                rowEvents={rowEvents}
                filter={filterFactory()}
                defaultSorted={defaultSorted}
                {...props.baseProps}
                {...paginationTableProps}
              />
            </div>
          )
        }

      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );

  return (
    <PaginationProvider
      pagination={
        paginationFactory(options)
      }
    >
      {contentTable}
    </PaginationProvider>
  );
}

// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// const DataTable = ({ columns, data,defaultSorted }) => {
//     return (
//         <BootstrapTable
//            bodyClasses="foo"
//             bootstrap4
//             keyField="id"
//             data={data}
//             columns={columns}
//             defaultSorted={defaultSorted}
//         />
//     )
// }

export default DataTable;