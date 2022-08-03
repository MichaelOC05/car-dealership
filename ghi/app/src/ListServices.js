import React from 'react';
import { Link, NavLink } from 'react-router-dom';





class ListServices extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            services: []
        }
        // this.handleDelete = this.handleDelete.bind(this) 
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
                    if (service.completed === false) {
                        list_services.push(service)
                    }
                }
                this.setState({services: list_services})
            }
        }catch (e) {
            console.error(e)
        }
        
    }

    async handleDelete(id) {
        const del_url = `http://localhost:8080/api/services/appointments/${id}/`
        const fetchConfig = {
            method: "DELETE"
        }
        const response = await fetch(del_url, fetchConfig)
        console.log(response, "deleted")
        window.location.reload()
    }
    
    render() {
        if (this.state.services !== undefined) {
        
        return(
            <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.services.map(service => {
                        let vip = ""
                        if (service.automobile.sold === true) {
                            vip = "VIP"
                        } 
                        let date = service.date_time.slice(0, 10)
                        let time = service.date_time.slice(11, 16)
                        return (
                            <tr key={service.id}>
                                <td>{service.automobile.vin}</td>
                                <td>{vip}</td>
                                <td>{service.customer.name}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{service.technician.name}</td>
                                <td>{service.reason}</td>
                                <td><button className="btn btn primary" onClick={ () => this.handleDelete(service.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}}




export default ListServices