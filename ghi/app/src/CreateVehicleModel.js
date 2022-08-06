import React from 'react';

class VehicleModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.childToParent(1)
    this.state = {
      name: "",
      manufacturer_id: "",
      picture_url: "",
      manufacturers: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
    this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.manufacturers
    console.log(data)
    const modelsUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(modelsUrl, fetchConfig);
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