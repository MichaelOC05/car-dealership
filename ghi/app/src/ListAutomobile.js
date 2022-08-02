function ListAutomobiles({automobiles}) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {automobiles.map(automobile => {
                    return (
                        <tr key={automobile.vin}>
                            <td>{automobile.vin}</td>
                            <td>{automobile.color}</td>
                            <td>{automobile.year}</td>
                            <td>{automobile.model.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ListAutomobiles