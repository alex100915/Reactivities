import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Card, Grid, Header, Image, Loader, Segment, Tab, TabPane } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileActivities() {
    const { profileStore } = useStore();
    const { profile, userActivities, loadActivities, loadingActivities } = profileStore;

    useEffect(() => {
        loadActivities('future', profile!.username)
    }, [profile, loadActivities])

    const panes = [
        { menuItem: 'Future Events', render: () => renderActivties() },
        { menuItem: 'Past Events', render: () => renderActivties() },
        { menuItem: 'Hosting', render: () => renderActivties() }
    ]

    function renderActivties() {
        return (
            <Tab.Pane loading={loadingActivities}>
                <Grid>
                    <Grid.Column width={16}>
                        <Card.Group itemsPerRow={4}>                            
                            {
                            userActivities?.map(activity => (

                                <Card key={activity.id}>
                                    <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid />
                                    <Card.Content>
                                        <Card.Header textAlign="center">{activity.title}</Card.Header>
                                        <Card.Description textAlign="center">{format(activity.date!,'dd MMM')}</Card.Description>
                                        <Card.Description textAlign="center">{format(activity.date!,'h:mm aa')}</Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        )
    }

    function loadUserActivities(tabNumber: any) {
        switch (tabNumber) {
            case 0:
                loadActivities('future', profile!.username);
                break;
            case 1:
                loadActivities('past', profile!.username);
                break;
            case 2:
                loadActivities('hosting', profile!.username);
                break;
            default:
                loadActivities('future', profile!.username);
                break;
        }
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column width='16'>
                    <Header style={{marginBottom:'2em'}} floated='left' icon='calendar' content='Activities'/>
                </Grid.Column>
            </Grid>
            <Tab menu={{ fluid: true }} panes={panes}
                onTabChange={(e, data) => loadUserActivities(data.activeIndex)} />
        </Segment>
    )
})