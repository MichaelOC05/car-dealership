function ListManufactures({manufacturers}) {
    if (manufacturers !== undefined) {
        return (
            <>
            <p></p>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        )
    }
}

export default ListManufactures