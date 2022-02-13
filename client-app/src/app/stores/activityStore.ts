import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from '../models/activity';


export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    loadingInitial = true;
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((x, y) => Date.parse(x.date) - Date.parse(y.date));
    }

    loadActivities = async () => {
        this.setLoadingIntitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingIntitial(false)

        } catch (error) {
            console.log(error);
            this.setLoadingIntitial(false)
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if (activity)
        {
            this.selectedActivity=activity;
            return activity;
        }
        else {
            try {
                this.setLoadingIntitial(true);
                let activity = await agent.Activities.details(id);                
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.setLoadingIntitial(false);
                
                return activity;
            }
            catch (error) {
                console.log(error);
                this.setLoadingIntitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split("T")[0]
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingIntitial = (value: boolean) => {
        this.loadingInitial = value;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}