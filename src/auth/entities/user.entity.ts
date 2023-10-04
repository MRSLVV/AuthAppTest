import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()

export class User{

    @Prop({unique: true, reuquired: true})
    email: string;
    
    @Prop({reuquired: true})
    name: string;
  
    @Prop({reuquired: true})
    password?: string;
  
    @Prop({type: [String], default : ['user'] })
    roles: string[];
     
}

export const UserSchema = SchemaFactory.createForClass( User );