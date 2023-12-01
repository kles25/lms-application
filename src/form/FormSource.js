export const userInputs = [
    {
        id: "displayName",
        label: "Fullname",
        type: "text",
        placeholder: "Fullname",
    },
    {
        id: "gender",
        label: "Gender",
        type: "select", // You can indicate it's a select dropdown
        options: [
            { label: "Select Gender", value: "" }, // Placeholder option
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" }, // Additional options if needed
        ],
    },
    {
        id: "birthday", // New field for birthday
        label: "Birthday",
        type: "date", // Using date type for birthday input
    },
    {
        id: "email",
        label: "Email",
        type: "mail",
        placeholder: "Email",
    },
    {
        id: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Phone",
    },
    {
        id: "password",
        label: "Password",
        type: "password",
    },
    {
        id: "address",
        label: "Address",
        type: "text",
        placeholder: "Address",
    }
    // {
    //     id: "role",
    //     label: "Role",
    //     type: "select", // You can indicate it's a select dropdown
    //     options: [
    //         { label: "Select Role", value: "" }, // Placeholder option
    //         { label: "Admin", value: "Admin" },
    //         { label: "Teacher", value: "Teacher" },
    //         { label: "Student", value: "Student" }, // Additional options if needed
    //     ],
    // },

];