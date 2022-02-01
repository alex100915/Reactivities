import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectActivity: (id:string) =>  void
    selectedActivity : Activity | undefined
    cancelSelectActivity() : void
}


export default function ActivityDashboard({activities,selectActivity,selectedActivity,cancelSelectActivity} :Props)
{
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}></ActivityDetails>}
                <ActivityForm/>
            </Grid.Column>
        </Grid>
    )
}