export const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.photoURL} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "displayName",
        headerName: "Name",
        width: 130,
    },
    {
        field: "role",
        headerName: "Role",
        width: 100,
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "address",
        headerName: "Address",
        width: 100,
    },
    {
        field: "birthday",
        headerName: "Birthday",
        width: 100,
    },
    // {
    //     field: "phone",
    //     headerName: "Phone",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];

export const enrolleesColumns = [
    { field: "id", headerName: "ID", width: 100 },
    // {
    //     field: "user",
    //     headerName: "User",
    //     width: 130,
    //     renderCell: (params) => {
    //         return (
    //             <div className="cellWithImg">
    //                 <img className="cellImg" src={params.row.photoURL} alt="avatar" />
    //                 {params.row.username}
    //             </div>
    //         );
    //     },
    // },
    {
        field: "displayName",
        headerName: "Name",
        width: 130,
    },
    {
        field: "courseName",
        headerName: "Course",
        width: 200,
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "phone",
        headerName: "Contact",
        width: 100,
    },
    {
        field: "address",
        headerName: "Address",
        width: 100,
    },
    {
        field: "birthday",
        headerName: "Birthday",
        width: 100,
    },
    {
        field: "gender",
        headerName: "Gender",
        width: 100,
    },
    // {
    //     field: "phone",
    //     headerName: "Phone",
    //     width: 160,
    //     renderCell: (params) => {
    //         return (
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         );
    //     },
    // },
];