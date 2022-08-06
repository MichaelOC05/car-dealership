import React from 'react';

class SalesRecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.childToParent(2)
    this.state = {
      sales_person_employee_number: "",
      automobile_vin: "",
      customer_id: "",
      price: "",
      
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
    this.handleChangeSalesPerson = this.handleChangeSalesPerson.bind(this)
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this)
    this.handleChangeAutomobile = this.handleChangeAutomobile.bind(this)
  }


  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    console.log(data)
    const salesRecordUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(salesRecordUrl, fetchConfig);
    if (response.ok) {
      const automobileUpdateUrl = `http://localhost:8100/api/automobiles/${this.state.automobile_vin}/`
      const fetchUpdateConfig = {
        method: "PUT",
        body: JSON.stringify({sold: true}),
        headers: {
            'Content-Type': 'application/json',  
        },
      }
      const updateResponse = await fetch(automobileUpdateUrl, fetchUpdateConfig)
      if (updateResponse.ok) {
        console.log("sold updated to true")
      }
      const newSale = await response.json();
      console.log(newSale)
      setTimeout(function(){window.location.reload()},1000)
    }
  }

  handleChangePrice(event) {
    const value = event.target.value;
    this.setState({ price: value });
  }

  handleChangeSalesPerson(event) {
    const value = event.target.value
    console.log(value)
    this.setState({ sales_person_employee_number: value })
  }

  handleChangeCustomer(event) {
    const value = event.target.value;
    this.setState({ customer_id: value });
  }

  handleChangeAutomobile(event) {
    const value = event.target.value;
    this.setState({ automobile_vin: value });
  }

    render() {
      return (
            <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a Sales Record</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
                <input onChange={this.handleChangePrice} placeholder="Price" required type="number" max="99999999999.99" step=".01" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
            </div>
            <div className="mb-3">
                <select onChange={this.handleChangeSalesPerson} required name="sales_person" id="sales_person" className="form-select">
                <option value="">Choose a Sales Person</option>
                {this.props.sales_persons.map(salesPerson => {
                    return (
                        <option key={salesPerson.employee_number} value={salesPerson.employee_number}>
                        {salesPerson.name}
                    </option>
                    )
                })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={this.handleChangeCustomer} required name="customer" id="customer" className="form-select">
                <option value="">Choose a customer</option>
                {this.props.salesCustomers.map(customer => {
                    return (
                        <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>
                    )
                })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={this.handleChangeAutomobile} required name="automobile" id="automobile" className="form-select">
                <option value="">Choose an automobile</option>
                {this.props.salesAutomobiles.map(auto => {
                  if (auto.sold == false) {
                    return (
                      <option key={auto.vin} value={auto.vin}>
                        {auto.vin}
                    </option>
                    )
                  }
                  })}
                </select>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
    );
    }
            
        
}

export default SalesRecordForm;