import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid'
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { loading, createActivity, updateActivity, loadActivity, loadingInitial, setLoadingIntitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
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

    }, [id, loadActivity, setLoadingIntitial])

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            })

        }
        else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`)
            })
        }
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    const validationSchema = Yup.object({
        title: Yup.string().required("The activity title is required"),
        category: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required('date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

    return (

        <Segment clearing>
            <Header content='Activity Details' color="teal" />
            <Formik enableReinitialize
                validationSchema={validationSchema}
                initialValues={activity}
                onSubmit={values => handleFormSubmit(activity)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Title' name='title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa' />
                        <Header content='Loacation Details' color="teal" />
                        <MyTextInput placeholder='City' name='city'></MyTextInput>
                        <MyTextInput placeholder='Venue' name='venue'></MyTextInput>
                        <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right' positive type="submit" content="Submit" />
                        <Button as={Link} to={`/activities/${activity.id}`} floated='right' positive type="button" content="Cancel" />
                    </Form>)}
            </Formik>

        </Segment>
    )
})