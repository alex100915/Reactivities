import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

interface Props{
    setFormVisibility : (showForm : boolean) => void
}

export default function NavBar({setFormVisibility} : Props) {

    return (
        <Menu inverted fixed="top">
            <Container>
                <MenuItem header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </MenuItem>
                <MenuItem name="Activities"/>
                <MenuItem>
                    <Button onClick={() => setFormVisibility(true)} positive content="Create Activity"></Button>
                </MenuItem>
            </Container>    

        </Menu>
    )
}