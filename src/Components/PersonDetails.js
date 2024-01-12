import React from 'react'

export default function PersonDetails({person}) {
  return (
    <div>
        <table className="table mt-2 table_shadow">
            <tr>                
                <th>Name</th>
                <th>Mobile</th>
                <th>Karyakar Name</th>                
            </tr>
            <tr>
                <td>{person.name}</td>
                <td>{person.mobile}</td>
                <td>{person.karyakarName}</td>
            </tr>
        </table>
    </div>
  )
}
