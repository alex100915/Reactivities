import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{    
    activity: Activity | undefined;
    closeForm: () => void
}


export default function ActivityForm({activity: selectedActivity, closeForm} : Props){
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description:'',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity]=useState(initialState);


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {
        const {name,value}=event.target;

        setActivity({...activity, [name]:value});
    }

    function handleSubmit()
    {
        console.log(activity);
    }
    
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} ></Form.TextArea>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}></Form.Input>
                <Button onClick={useEffect} floated='right' positive type="submit" content="Submit" />
                <Button onClick={closeForm} floated='right' positive type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}