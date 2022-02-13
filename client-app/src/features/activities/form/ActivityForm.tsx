import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { loading, createActivity, updateActivity, loadActivity, loadingInitial,setLoadingIntitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history=useHistory();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });


    useEffect(() => {
        if (id)
            loadActivity(id).then((activity) => {
                setActivity(activity!)
            })
        else
            setLoadingIntitial(false);

    }, [id, loadActivity])

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setActivity({ ...activity, [name]: value });
    }

    function handleSubmit() {
        if(activity.id.length===0)
        {
            let newActivity={
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(()=>{
                history.push(`/activities/${newActivity.id}`);
            })

        }
        else
        {
            updateActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
            })
        } 
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} ></Form.TextArea>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange}></Form.Input>
                <Form.Input
                    placeholder='Date'
                    type="date"
                    name='date'
                    value={activity.date}
                    onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}></Form.Input>
                <Button onClick={handleSubmit} loading={loading} floated='right' positive type="submit" content="Submit" />
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' positive type="button" content="Cancel" />
            </Form>
        </Segment>
    )
})