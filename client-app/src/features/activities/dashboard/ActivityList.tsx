import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    activities: Activity[];
    deleteActivity: (id: string) => void
    submitting: boolean
}

export default function ActivityList({ activities, deleteActivity, submitting }: Props) {

    const [target, setTarget] = useState('');

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    const { activityStore } = useStore();

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => { activityStore.selectActivity(activity.id); }} floated='right' content='View' color='blue'></Button>
                                    <Button
                                        name={activity.id}
                                        loading={submitting && activity.id === target}
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
}