import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Show = ({ roles }) => {
    let prettyRoles = roles;
    prettyRoles = prettyRoles.replace(/\[|\]|\"/g, '').replace(',', ' & ').toUpperCase();
    //prettyRoles = prettyRoles.replace('["', '').replace('"]', '').toUpperCase();

    return (
        <p>Logged in as: {prettyRoles}</p>
    );
};

export default Show;