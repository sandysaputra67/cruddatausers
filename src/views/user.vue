<template> 
<div class="columns">
    <div class="column is-three-fifths">
        <table v-if="data.length!=0" class="table">
            <thead>
                <tr>
                    <th v-for="(column,index) in columns" :key="index">{{column}}</th>
                    <th style="text-center">action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,index_row) in data" :key="index_row" v-bind:class="{ editing: editId === row.id }" >
                    <td v-for="(column,index) in columns" :key="index"> {{row[column]}} </td>    
                    <td>
                        <p class="buttons">
                            <a class="button is-small is-primary" @click="editCustomer(row)">Edit</a>
                            <a class="button is-small is-danger" @click="deleteCustomer(row.id)">Delete</a>
                        </p>
                    </td>   
                </tr>
            </tbody>
        </table> 
        <div v-else class="notification is-danger">
            Warning !<strong> No Data to Show</strong>
        </div>
    </div>
    <div class="column">
        <a href="#" v-show="showAdd == false" @click="addUser()" class="button is-small is-danger" style="float:right;margin-top:-20px" >X</a>
        <User :editId="editId"></User>
    </div>
</div>    
</template>

<script>

import User from '../components/User.vue';

export default {
    name:'Customer',
    components:{
        User,
    },
    data() {
            return {
                showAdd:true,
                editId:'',
            }
        },
    computed:{
            data(){
                return this.$store.state.users;
            },
            columns(){
                return this.$store.state.users.length>0 ?
                       Object.keys(this.$store.state.users[0]) : []
            }
        },
    methods:{
            editUser(customer){
                this.editId = customer.id;
                this.showAdd = false;
            },
            addUser(){
                this.editId = "";
                this.showAdd = true;
            },
            deleteuUser(customer){
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                    if (result.value) {
                        
                        this.$store.dispatch('removeCustomer',customer).then((res)=>{
                            if(res) this.$swal(
                                    'Deleted!',
                                    'Record has been deleted.',
                                    'success'
                                    )
                            else this.$swal(
                                    'Fail!',
                                    'Fail to delete record.',
                                    'error'
                                    )                                 
                        });
                        

                    }
                    })
            }
        }
        
}
</script>
<style>
.editing {
    background-color: #fff8db;
}
</style>
