import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Grid, GridColumn, Header, Icon, Item, Label, Placeholder, Segment, TextArea } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile, UpdateAbout } from "../../app/models/Profile";
import * as Yup from 'yup'
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}


export default observer(function ProfileAbout({ profile }: Props) {

    const [editProfile, setEditProfile] = useState(false);
    const { profileStore: { updateAbout } } = useStore();
    const validationSchema = Yup.object({
        displayName: Yup.string().required("displayname is required")
    })

    function handleFormSubmit(profile: Profile) {
        updateAbout(new UpdateAbout(profile)).then(() => {
            setEditProfile(false)
        });
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                <Header floated="left" icon='user' content={'About ' + profile.displayName}></Header>
                <Button basic floated="right" content={!editProfile ? 'Edit profile' : 'Cancel'} onClick={() => setEditProfile(!editProfile)}></Button>
            </Grid.Column>
            {!editProfile ?
                <>
                    <Grid.Column width={16}>
                        <span>{profile.bio}</span>
                    </Grid.Column>
                </>
                :
                (
                    <>
                        <Grid.Column width={16}>
                            <Segment clearing>
                                <Formik enableReinitialize
                                    validationSchema={validationSchema}
                                    initialValues={profile}
                                    onSubmit={values => handleFormSubmit(values)}>
                                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                        <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                                            <MyTextInput placeholder='Display name' name='displayName' />
                                            <MyTextArea rows={3} placeholder='Bio' name='bio' />
                                            <Button
                                                disabled={isSubmitting || !dirty || !isValid}
                                                loading={isSubmitting} floated='right' positive type="submit" content="Update profile" />
                                        </Form>)}
                                </Formik>

                            </Segment>
                        </Grid.Column>
                    </>
                )
            }

        </Grid >

    )
})