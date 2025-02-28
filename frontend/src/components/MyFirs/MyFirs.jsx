import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux"; // For accessing Redux state
import Navbar from "../Navbar/Navbar";
import "./MyFirs.css";

const MyFirs = () => {
    const [firs, setFirs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Retrieve email ID from Redux state
    const email = useSelector((state) =>
        state.auth?.officer?.email ? state.auth.officer.email : state.auth?.user?.email
    );

    console.log(email);
    useEffect(() => {
        // Fetch FIR data
        const fetchMyFirs = async () => {
            if (!email) {
                console.error("Email not found in Redux state.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://intellifir-1.onrender.com/fir/fetch-my-fir`, {
                    params: { email }, // Send email as a query parameter
                });
                console.log("response is: ", response.data.data);
                setFirs(response.data.data); // Assume the response is an array of FIR objects
            } catch (error) {
                console.error("Error fetching FIR data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyFirs();
    }, [email]);

    return (
        <div>
            <Navbar />
            <div className="myfir-block">
                <div className="table-container">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>FIR ID</TableCell>
                                    <TableCell>Aadhar Number</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Mobile Number</TableCell>
                                    <TableCell>Complaint</TableCell>
                                    <TableCell>IPC Section</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>Created By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : firs.length > 0 ? (
                                    firs.map((fir) => (
                                        <TableRow key={fir.fir_id}>
                                            <TableCell>{fir.fir_id}</TableCell>
                                            <TableCell>{fir.aadhar_number}</TableCell>
                                            <TableCell>{fir.name}</TableCell>
                                            <TableCell>{fir.address}</TableCell>
                                            <TableCell>{fir.age}</TableCell>
                                            <TableCell>{fir.mobile_number}</TableCell>
                                            <TableCell>{fir.complaint}</TableCell>
                                            <TableCell>{fir.ipc_section}</TableCell>
                                            <TableCell>{fir.date}</TableCell>
                                            <TableCell>{fir.status}</TableCell>
                                            <TableCell>{fir.active}</TableCell>
                                            <TableCell>{fir.created_by}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={12} align="center">
                                            No FIRs found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default MyFirs;
