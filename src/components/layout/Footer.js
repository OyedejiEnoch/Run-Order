import React, { Fragment } from "react";


function Footer() {
    const date = new Date().getFullYear()

    return (
        <Fragment>
            <footer className="py-1">
                <p className="text-center mt-1">
                    Run Order -{date}, || Techworks,All Rights Reserved
                </p>
            </footer>
        </Fragment>
    )
}

export default Footer