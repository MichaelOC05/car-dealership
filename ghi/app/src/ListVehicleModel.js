function ListVehicleModels({models, childToParent}) {
    childToParent(1)
    if (models !== undefined) {
        return (
            <>
            <p></p>
            <h1>Vehicle Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>

                </thead>
                <tbody>
                    {models.map(model => {
                        console.log(model.picture_url)
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td>
                                    <img src={model.picture_url} height="150px" width="auto" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}

export default ListVehicleModels