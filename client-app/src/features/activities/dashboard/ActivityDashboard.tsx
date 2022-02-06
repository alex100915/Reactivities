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
    editMode: boolean;
    openForm: (id : string) => void
    closeForm: () => void;
    createOrEditActivity:(activity: Activity) => void
    deleteActivity: (id : string) => void
    submitting: boolean
}


export default function ActivityDashboard({activities,selectActivity,selectedActivity,cancelSelectActivity,editMode,openForm,closeForm,createOrEditActivity,
    deleteActivity,submitting} :Props)
{
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                ></ActivityDetails>}                
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEditActivity={createOrEditActivity} submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}