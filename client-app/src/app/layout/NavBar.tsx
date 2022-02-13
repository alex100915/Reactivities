import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {    
    
    const{activityStore} = useStore()

    return (
        <Menu inverted fixed="top">
            <Container>
                <MenuItem as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:"10px"}}/>
                    Reactivities
                </MenuItem>
                <MenuItem as={NavLink} to='/activities' name="Activities"/>
                <MenuItem as={NavLink} to='/createActivity'>
                    <Button positive content="Create Activity"></Button>
                </MenuItem>
            </Container>    

        </Menu>
    )
}