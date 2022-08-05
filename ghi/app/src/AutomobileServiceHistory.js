import React from 'react';
import { Link, NavLink } from 'react-router-dom';


class AutomobileServiceHistory extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            automobiles: [],
            selected_automobile: "",
            selected_services: []
        }
        this.handleSelectAutomobile = this.handleSelectAutomobile.bind(this)
    }    
    async componentDidMount() {
        const services_url = "http://localhost:8080/api/services/appointments/"
        try {
            const response = await fetch(services_url)
            if (response.ok) {
                const data = await response.json()
                const services = data["services"]
                let list_services = []
                for (let service of services) {
                    if (service.completed === true) {
                        list_services.push(service)
                    }
                }
                this.setState({services: list_services})
            }
        }catch (e) {
            console.error(e)
        }
        const automobileUrl = "http://localhost:8080/api/services/automobiles/"
        const automobileResponse = await fetch(automobileUrl)
        const automobileData = await automobileResponse.json()
        this.setState({automobiles: automobileData.automobileVOs })
    }


    async handleSelectAutomobile(event) {
        const value = event.target.value
        await this.setState({ selected_automobile: value })
        let selectedServices = []
        selectedServices = this.state.services.filter(service => 
            service.automobile.vin === this.state.selected_automobile
        
        )
        this.setState({selected_services: selectedServices})
    }


    render() {
        if (this.state.services !== undefined) {
        
        return(
            <>
             <div className="m-3">
                <select onChange={this.handleSelectAutomobile} required name="Automobile" id="automobile" className="form-select">
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
            <h2>{this.state.selected_automobile} Service History</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIP</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {this.state.selected_services.map(service => {
                        let vip = ""
                        if (service.automobile.sold === true) {
                            vip = "VIP"
                        } 
                        let date = service.date_time.slice(0, 10)
                        let time = service.date_time.slice(11, 16)
                        return (
                            <tr key={service.id}>
                                <td>{vip}</td>
                                <td>{service.customer.name}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{service.technician.name}</td>
                                <td>{service.reason}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}}




export default AutomobileServiceHistory