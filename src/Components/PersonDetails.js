import React from 'react'

export default function PersonDetails({person}) {
  return (
    <div style={{marginTop: 15}}>
        <table className="table mt-2 table_shadow">
            <tr>                
                <th>Name</th>
                <th>Birth Date</th>
                <th>Mobile no</th>
                <th>Sampark Karyakar</th>
            </tr>
            <tr>
                <td>{person.name}</td>
                <td>{person.birthDate}</td>
                <td>{person.mobile}</td>
                <td>{person.karyakarName}</td>
            </tr>
        </table>
    </div>
  )
}
