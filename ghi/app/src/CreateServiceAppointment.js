import React from 'react';

class ServiceAppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicians: [],
      automobiles: [],
      customers: [],
      technician_employee_number: "",
      automobile_vin: "",
      customer_id: "",
      reason: "",
      date_time: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTechnician = this.handleChangeTechnician.bind(this);
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.handleChangeAutomobileVin = this.handleChangeAutomobileVin.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this)
    this.handleChangeDateTime = this.handleChangeDateTime.bind(this)
  }

  async componentDidMount() {
    const urlTechnicians = 'http://localhost:8080/api/services/technicians/';
    const responseTechnicians = await fetch(urlTechnicians);
    if (responseTechnicians.ok) {
      const dataTechnicians = await responseTechnicians.json();
      this.setState({ technicians: dataTechnicians.technicians });
    }
    const urlAutomobiles = "http://localhost:8080/api/services/automobiles/"
    const responseAutomobiles = await fetch(urlAutomobiles)
    if (responseAutomobiles.ok) {
        const dataAutomobiles = await responseAutomobiles.json()
        this.setState({ automobiles: dataAutomobiles.automobileVOs})
        
    const urlCustomers = "http://localhost:8080/api/services/customers/"
    const responseCustomers = await fetch(urlCustomers)
    if (responseCustomers.ok) {
        const dataCustomers = await responseCustomers.json()
        this.setState({ customers: dataCustomers.customers })
    }
    }

  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.technicians
    delete data.customers
    delete data.automobiles
    console.log(data)
    const appointmentUrl = "http://localhost:8080/api/services/appointments/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();
      console.log(newAppointment)
      window.location.reload()
    }
  }

  handleChangeTechnician(event) {
    const value = event.target.value;
    this.setState({ technician_employee_number: value });
  }

  handleChangeCustomer(event) {
    const value = event.target.value;
    this.setState({ customer_id: value });
  }

  handleChangeAutomobileVin(event) {
    const value = event.target.value;
    this.setState({ automobile_vin: value });
  }

  handleChangeReason(event) {
    const value = event.target.value
    this.setState({ reason: value })
  }

  handleChangeDateTime(event) {
    const value = event.target.value
    this.setState({ date_time: value})
  }



  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Model</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="mb-3">
                <select onChange={this.handleChangeTechnician} required name="Technician" id="technician" className="form-select">
                  <option value="">Choose a Technician</option>
                  {this.state.technicians.map(technician => {
                    return (
                      <option key={technician.employee_number} value={technician.employee_number}>
                      {technician.name}
                      </option>
                    )
                  })}
                </select>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleChangeCustomer} required name="Customer" id="customer" className="form-select">
                    <option value="">Choose a Customer</option>
                    {this.state.customers.map(customer => {
                        return (
                        <option key={customer.id} value={customer.id}>
                        {customer.name}
                        </option>
                        )
                    })} 
                    </select>
                </div>
                <div className="mb-3">
                <select onChange={this.handleChangeAutomobileVin} required name="Automobile" id="automobile" className="form-select">
                  <option value="">Choose a Automobile</option>
                  {this.state.automobiles.map(automobile => {
                    return (
                      <option key={automobile.vin} value={automobile.vin}>
                      {automobile.vin}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                  <input onChange={this.handleChangeReason} placeholder="Reason" required type="text" id="reason" name="reason" value={this.state.reason} />
              </div>
              <div className="mb-3">
                <input onChange={this.handleChangeDateTime} required type="datetime-local" id="date_time" name="date_time" value={this.state.date_time} />
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
             </div>
           </div>
         </div>
    );
  }
}

export default ServiceAppointmentForm;