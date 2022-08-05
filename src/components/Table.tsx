import {Table as TableBs} from 'react-bootstrap';

const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"},
  ]

const Table: React.FC = () => {
    return (
        <TableBs>
            <thead>
                <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                </tr>
            </thead>
            <tbody>
            {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.age}</td>
                            <td>{val.gender}</td>
                        </tr>
                    )
                })}
            </tbody>
        </TableBs>
    )
}

export default Table