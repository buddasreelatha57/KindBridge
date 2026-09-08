import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaRupeeSign,
    FaSearch,
    FaEye,
    FaTrash,
    FaDownload,
    FaFilter
} from "react-icons/fa";

import "./AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const res = await api.get("/admin/users");

            setUsers(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredUsers = useMemo(() => {

        let data = users;

        if (filter === "DONORS") {

            data = data.filter(
                user => (user.totalDonated || 0) > 0
            );

        }

        if (filter === "NONDONORS") {

            data = data.filter(
                user => (user.totalDonated || 0) === 0
            );

        }

        if (search.trim() !== "") {

            data = data.filter(user =>

                user.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                user.email
                    .toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        return data;

    }, [users, search, filter]);

    const totalDonors = users.filter(

        user => (user.totalDonated || 0) > 0

    ).length;

    const totalAmount = users.reduce(

        (sum, user) =>

            sum + (user.totalDonated || 0),

        0

    );

    const totalInactive =

        users.length - totalDonors;

    return (

        <div className="admin-users">

            {/* HEADER */}

            <div className="users-header">

                <div>

                    <h1>User Management</h1>

                    <p>

                        Manage all registered users and monitor donations.

                    </p>

                </div>

                <button className="export-btn" onClick={async () => {
                    try {
                        const blob = await import('../services/adminService').then(m => m.exportUsersCsv());
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'users.csv';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                    } catch (err) {
                        console.error('Export failed', err);
                        alert('Export failed');
                    }
                }}>

                    <FaDownload />

                    Export CSV

                </button>

            </div>

            {/* STATISTICS */}

            <div className="stats-grid">

                <div className="stat-box">

                    <div className="icon teal">

                        <FaUsers />

                    </div>

                    <div>

                        <span>Total Users</span>

                        <h2>{users.length}</h2>

                    </div>

                </div>

                <div className="stat-box">

                    <div className="icon green">

                        <FaUserCheck />

                    </div>

                    <div>

                        <span>Active Donors</span>

                        <h2>{totalDonors}</h2>

                    </div>

                </div>

                <div className="stat-box">

                    <div className="icon orange">

                        <FaUserTimes />

                    </div>

                    <div>

                        <span>Non Donors</span>

                        <h2>{totalInactive}</h2>

                    </div>

                </div>

                <div className="stat-box">

                    <div className="icon blue">

                        <FaRupeeSign />

                    </div>

                    <div>

                        <span>Total Donated</span>

                        <h2>

                            ₹{totalAmount.toLocaleString()}

                        </h2>

                    </div>

                </div>

            </div>

            {/* SEARCH */}

            <div className="toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search by name or email..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

                <div className="filter-box">

                    <FaFilter />

                    <select

                        value={filter}

                        onChange={(e) =>

                            setFilter(e.target.value)

                        }

                    >

                        <option value="ALL">

                            All Users

                        </option>

                        <option value="DONORS">

                            Donors

                        </option>

                        <option value="NONDONORS">

                            Non Donors

                        </option>

                    </select>

                </div>

            </div>

                        <div className="users-table-card">

                {

                    loading ?

                    <div className="loading">

                        Loading Users...

                    </div>

                    :

                    filteredUsers.length === 0 ?

                    <div className="empty-state">

                        <h2>No Users Found</h2>

                        <p>

                            Try another search or filter.

                        </p>

                    </div>

                    :

                    <table>

                        <thead>

                            <tr>

                                <th>User</th>

                                <th>Role</th>

                                <th>Joined</th>

                                <th>Donations</th>

                                <th>Total Amount</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredUsers.map(user => (

                                    <tr key={user.id}>

                                        <td>

                                            <div className="user-cell">

                                                <div className="avatar">

                                                    {

                                                        user.name

                                                            ?.charAt(0)

                                                            .toUpperCase()

                                                    }

                                                </div>

                                                <div>

                                                    <h4>

                                                        {user.name}

                                                    </h4>

                                                    <p>

                                                        {user.email}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <span className={

                                                user.role === "ADMIN"

                                                ?

                                                "role admin"

                                                :

                                                "role user"

                                            }>

                                                {

                                                    user.role ||

                                                    "USER"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                user.createdAt

                                                    ?

                                                new Date(

                                                    user.createdAt

                                                ).toLocaleDateString()

                                                :

                                                "--"

                                            }

                                        </td>

                                        <td>

                                            <span className="donation-badge">

                                                {

                                                    user.donationCount ||

                                                    0

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            ₹

                                            {

                                                (

                                                    user.totalDonated ||

                                                    0

                                                ).toLocaleString()

                                            }

                                        </td>

                                        <td>

                                            <span

                                                className={

                                                    (

                                                        user.totalDonated ||

                                                        0

                                                    ) > 0

                                                    ?

                                                    "status active"

                                                    :

                                                    "status inactive"

                                                }

                                            >

                                                {

                                                    (

                                                        user.totalDonated ||

                                                        0

                                                    ) > 0

                                                    ?

                                                    "Active"

                                                    :

                                                    "Inactive"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <div className="actions">

                                                <button

                                                    className="view-btn"

                                                    title="View User"

                                                >

                                                    <FaEye />

                                                </button>

                                                <button

                                                    className="delete-btn"

                                                    title="Delete User"

                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                }

            </div>

        </div>

    );

}

export default AdminUsers;