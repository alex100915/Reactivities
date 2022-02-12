import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

export default observer (function ActivityList() {

    const { activityStore } = useStore();
    const{activitiesByDate,selectActivity,loading,deleteActivity}=activityStore;
    const [target, setTarget] = useState('');

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }


    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => { activityStore.selectActivity(activity.id); }} floated='right' content='View' color='blue'></Button>
                                    <Button
                                        name={activity.id}
                                        loading={loading && activity.id === target}
                                        onClick={(e) => handleDeleteActivity(e, activity.id)}
                                        floated='right'
                                        content='Delete'
                                        color='red' />
                                    <Label basic content={activity.category}></Label>
                                </Item.Extra>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})