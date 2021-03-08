import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Col } from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


const DataTable = ({ columns, data, defaultSorted }) => {

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
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
    //  console.log(row);
    }
  };
  
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
              <SearchBar 
               className="col-md-12"
               style={ { width: '500px' } }
               placeholder="Search"
              {...props.searchProps} />
              <BootstrapTable
                classes="table-responsive table-dark"
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