import mongoose from "mongoose";
import { Schema } from "mongoose";
import type { IGroup } from "../types/Group.type.ts";


const groupSchema = new mongoose.Schema<IGroup>(
    {
        groupName:{type: String,require: true},
        members:[{type:Schema.ObjectId, ref: 'User', require:true}],
        admins:[{type: Schema.ObjectId, ref: 'User', require:true}],
        owner:{type: Schema.ObjectId, ref: 'User', require:true},
        avatar:{type:String},
        description:{type: String}
    },{timestamps: true}
)

const Group = mongoose.model('Group',groupSchema)

export default Group