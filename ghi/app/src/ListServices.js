import React from 'react';
import { Link, NavLink } from 'react-router-dom';





class ListServices extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            services: []
        }
    }    
    async componentDidMount() {
        const services_url = "http://localhost:8080/api/services/appointments/"
        try {
            const response = await fetch(services_url)
            if (response.ok) {
                const data = await response.json()
                const services = data["services"]
                this.setState({services: services})
            }
        }catch (e) {
            console.error(e)
        }
        
    }
    render() {
        if (this.state.services !== undefined) {
        return(
            <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Vip</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.services.map(service => {
                        return (
                            <tr key={service.id}>
                                <td>{service.automobile.vin}</td>
                                <td>{service.automobile.sold}</td>
 

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




export default ListServices