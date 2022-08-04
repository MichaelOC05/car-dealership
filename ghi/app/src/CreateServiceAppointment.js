import React from 'react';

class VehicleModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicians: [],
      automobiles: [],
      customers: [],
      technician: "",
      automobile: "",
      customer: "",
      reason: "",
      date_time: "",
      completed: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
    this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
  }

  async componentDidMount() {
    const urlTechnician = 'http://localhost:8080/api/services/technicians/';
    const responseTechnician = await fetch(urlTechnician);
    if (responseTechnician.ok) {
      const dataTechnician = await response.json();
      this.setState({ technicians: dataTechnician.technicians });
    }
    const urlAutomobiles = "http://localhost:8080/api/services/automobiles/"
    const responseAutomobiles = await fetch(urlAutomobiles)
    if (responseAutomobiles.ok) {
        const dataAutomobiles = await responseAutomobiles.json()
        this.setState({ automobiles: dataAutomobiles.automobilesVOs})
    const urlCustomers = "http://localhost:8080/api/services/customers/"
    const responseCustomers = await fetch(urlCustomers)
    if (responseCustomers.ok) {
        const dataCustomers = responseCustomers.json()
        this.setState({ customers: dataCustomers.customers})
    }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.manufacturers
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
      const newModel = await response.json();
      console.log(newModel)
      this.setState({
        name: "",
        manufacturer: "",
        picture_url: "",
      });
      window.location.reload()
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeManufacturer(event) {
    const value = event.target.value;
    this.setState({ manufacturer_id: value });
  }

  handleChangePictureUrl(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }



  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Model</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePictureUrl} placeholder="Picture Url" type="url" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture Url</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeManufacturer} required name="Manufacturer" id="manufacturer" className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                      </option>
                    )
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

export default VehicleModelForm;