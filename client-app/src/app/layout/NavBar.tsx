import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {

    const { userStore: { user, logout, isLoggedIn } } = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <MenuItem as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    Reactivities
                </MenuItem>
                {isLoggedIn &&
                    <>
                        <MenuItem as={NavLink} to='/activities' name="Activities" />
                        {/* <MenuItem as={NavLink} to='/errors' name="Errors" /> */}
                        <MenuItem as={NavLink} to='/createActivity'>
                            <Button positive content="Create Activity"></Button>
                        </MenuItem>
                        <MenuItem position="right">
                            <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing="top left" text={user?.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </MenuItem>
                    </>
                }
            </Container>

        </Menu>
    )
})