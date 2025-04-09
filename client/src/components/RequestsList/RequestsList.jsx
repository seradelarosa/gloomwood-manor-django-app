// default guests to empty array so map function always works
const RequestsList = ({ guests = [], onRegister }) => {
    return (
        <>
            <h2 className="section-title">Unregistered Guests</h2>
            <table className="requests-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Stay Duration</th>
                        <th>Preferences</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.length === 0 ? (
                        <tr>
                            <td>No unregistered guests found.</td>
                        </tr>
                    ) : (
                        guests.map(guest => (
                            <tr key={guest.id}>
                                <td>{guest.full_name}</td>
                                <td>{guest.stay_duration} minutes</td>
                                <td>{guest.preferences}</td>
                                <td>
                                    <button onClick={() => onRegister(guest.id)}>
                                        Register
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
};

export default RequestsList;