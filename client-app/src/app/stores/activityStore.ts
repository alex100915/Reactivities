import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from '../models/activity';
import { v4 as uuid } from 'uuid'

export default class ActivityStore{
    activities: Activity[] = [];     
    loadingInitial=false;
    selectedActivity: Activity | undefined = undefined;
    editMode=false;
    loading=false;

    constructor() {
        makeAutoObservable(this);
    }

    setActivities= async  () => {
        this.setLoadingIntitial(true);
        try {        
        const activities=await agent.Activities.list();
        activities.forEach(activity=>{
            activity.date=activity.date.split("T")[0]
            this.activities.push(activity)            
          })
          this.setLoadingIntitial(false)

    } catch(error){
            console.log(error);
            this.setLoadingIntitial(false)
        }
    }

    setLoadingIntitial= (value: boolean) =>{
        this.loadingInitial=value;
    }

    selectActivity = (id : string) =>{
        this.selectedActivity=this.activities.find(a=>a.id===id);
    }

    cancelSelectedActivity =() => {
        this.selectedActivity=undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode=true;
    }

    closeForm = () =>{
        this.editMode=false;
    }

    createActivity = async (activity: Activity) =>{
        this.loading=true;
        try{    
            activity.id=uuid();
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activities.push(activity);
                this.selectedActivity=activity;
                this.editMode=false;                
                this.loading=false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    updateActivity = async (activity: Activity) =>{
        this.loading=true;
        try{    
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activities=[...this.activities.filter(a=>a.id!==activity.id),activity];
                this.selectedActivity=activity;
                this.editMode=false;                
                this.loading=false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}