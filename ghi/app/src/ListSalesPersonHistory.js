import React, { useEffect, useState } from "react"


function filteringTable(filteredSales) {
    return (
        <tbody>
        {filteredSales.map(sale =>  {
                return (
                    <tr key={sale.id}>
                    <td>{sale.sales_person.name}</td>
                    <td>{sale.sales_person.employee_number}</td>
                    <td>{sale.customer.name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>${sale.price}</td>
                </tr>
            )
        })}
        </tbody>
    )
}


let filteredSales = []
let filteredTable

function ListSalesPersonHistory({sales, salesPersons}) {
    console.log(sales)
    const [rerender, setRerender] = useState(false)
    

    function FilteringSales(selected) {
        filteredSales = []
        sales.map(sale => {
            if (sale.sales_person.employee_number == selected) {
                // console.log("selected matched")
                filteredSales.push(sale)
            }
        })
        return filteredSales
    }
    

        if (sales !== undefined) {
            return (
                <>
                <div>
                    <h1>Sales List</h1>
                </div>
                <form>
                <select onChange={(e) => {
                    const selected = e.target.value
                    filteredSales = FilteringSales(selected)
                    filteredTable = filteringTable(filteredSales)
                    console.log("filtered sales: ", filteredSales)
                    console.log("filtered table: ", filteredTable)
                    setRerender(!rerender)
                }} required id="salesPerson" name="salesPerson" className="form-select">
                        <option value="">Choose a Sales Person</option>
                        {salesPersons.map(salesPerson => {
                            return (
                                <option key={salesPerson.employee_number} value={salesPerson.employee_number}>
                                    {salesPerson.name}
                                </option>
                            )
                        })}
                </select>
                </form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {filteredTable}
                </table>
                </>
            )
        }
}

export default ListSalesPersonHistory