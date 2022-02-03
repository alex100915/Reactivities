import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    setFormVisibility : (showForm : boolean) => void
    editedActivity : Activity | undefined
}
export default function ActivityForm({setFormVisibility, editedActivity} : Props){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'>{editedActivity?.title}</Form.Input>
                <Form.TextArea placeholder='Description'>{editedActivity?.description}</Form.TextArea>
                <Form.Input placeholder='Category' input={editedActivity?.category}></Form.Input>
                <Form.Input placeholder='Date'>{editedActivity?.date}</Form.Input>
                <Form.Input placeholder='City'>{editedActivity?.city}</Form.Input>
                <Form.Input placeholder='Venue'>{editedActivity?.venue}</Form.Input>
                <Button floated='right' positive type="submit" content="Submit" />
                <Button onClick={()=>setFormVisibility(false)} floated='right' positive type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}