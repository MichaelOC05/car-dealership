import React from 'react';

class SalesCustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phone: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
  }


  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    console.log(data)
    const salesCustomerUrl = "http://localhost:8090/api/sales/customers/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(salesCustomerUrl, fetchConfig);
    if (response.ok) {
      const newSalesCustomer = await response.json();
      console.log(newSalesCustomer)
    //   this.setState({
    //     name: "",
    //     address: "",
    //     phone: "",
    //   });
      window.location.reload()
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeAddress(event) {
    const value = event.target.value;
    this.setState({ address: value });
  }

  handleChangePhoneNumber(event) {
    const value = event.target.value
    this.setState({ phone: value})
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a New Customer</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeAddress} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePhoneNumber} placeholder="Phone Number" type="number" name="phone_number" id="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <div className="mb-3">
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesCustomerForm;