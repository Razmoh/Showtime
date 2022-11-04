import { IsNotEmpty } from 'class-validator';


export class GroupDTO {
    @IsNotEmpty()
    name: string;
    
    type?: string;
    description?: string;
    image?:string
}
