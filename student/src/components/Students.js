import React, {useEffect, useState} from 'react';
import {
    TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';
import axios from 'axios'

const Students = (props)=>{
    const [students, setStudents] = useState([]);

    useEffect(()=>{
        axios.get(`http://${process.env.REACT_APP_API_URL}/students`)
        .then(res=>res.data)
        .then(stdnts=>setStudents(stdnts));
    }, [students]);

    return(
        <div>
            <table style={{ width: "100%" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>University</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => 
                        <TableRow className="data-row">
                            <TableCell>{student.fullName}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.phoneNumber}</TableCell>
                            <TableCell>{student.university.shortName}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </table>
        </div>
    );
}

export default Students;