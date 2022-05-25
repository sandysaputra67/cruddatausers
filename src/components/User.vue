<template>
<div>
    <form @submit="submit($event)">
        <div class="field">
            <label class="label">{{editAddText}} First Name</label>
            <div class="control">
                <input class="input" v-model="users.first_name" type="text" placeholder="First Name" required>
            </div>
        </div>
        <div class="field">
            <label class="label">{{editAddText}} Last Name</label>
            <div class="control">
                <input class="input" v-model="users.last_name" type="text" placeholder="Last Name" required>
            </div>
        </div>
        <div class="field">
            <label class="label">{{editAddText}} Date</label>
            <div class="control">
                <input class="input" v-model="currentDate" type="text" disabled>
            </div>
        </div>
        
        <div class="field-body">
            <div class="field is-narrow">
            <label class="label">{{editAddText}} Gender</label>    
            <div class="control">
                <label class="radio">
                <input type="radio" v-model="users.gender" value="Male" name='gender' required>
                Male
                </label>
                <label class="radio">
                <input type="radio" v-model="users.gender" value="Female" name='gender'>
                Female
                </label>
            </div>
            </div>
        </div>

        <div class="field is-grouped" style="margin-top:20px">
            <div class="control">
                <button class="button is-link">{{editAddText}} users</button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
export default {
    name:'User',
    props:['editId'],
    data(){
        return {
            users:{
                first_name:'',
                last_name:'',
                gender:'',
            }
        }
    },
    watch:{
        editId(val){
            if(val){
                let current = this.$store.state.userss.filter(i => {
                    if(i.id==val) return true;
                    else false;
                })[0]

                this.users.first_name = current.first_name;
                this.users.last_name = current.last_name;
                this.users.gender = current.gender;
            }else{
                this.resetFormData()
            }
        }
    },
    computed:{
        currentDate(){
            return new Date().toString();
        },
        editAddText(){
            return this.editId ? "Edit":"Insert";
        }
    },
    methods:{
        resetFormData() {

                this.users = {
                first_name:'',
                last_name:'',
                gender:'',
                }
        },
        submit(event){
            event.preventDefault();  
            var payload = this.users;
            payload['date'] = this.currentDate;
            
            if(!this.editId){
                payload['id'] =  this.$store.state.userss.length!=0? Math.max(...this.$store.state.userss.map(i => i.id)) + 1 : 0;
                const users = {...payload};
                this.$store.dispatch('addUser',users);
                this.resetFormData()
            }else{
                payload['id'] =   this.editId;
                const users = {...payload}
                this.$store.dispatch('editUser',users);                
            }
        }
    }
}
</script>