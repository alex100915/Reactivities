import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFiters()
{
    return ( 
        <>
            <Menu size='large' vertical style={{width:"100%", marginTop:20}}>
                <Header icon='filter' attached content='Filters' color="teal"/>
                <Menu.Item content="All activities" />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header/>
            <Calendar/>
        </>        
    );
}