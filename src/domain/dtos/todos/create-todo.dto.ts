export class CreateToDoDTO{
    private constructor(
        public readonly text:string,
    ){}

    static create(props:{[key:string]:any}):[string?,CreateToDoDTO?]{
        const {text} = props;
        if(!text)return ['Text property is required',undefined];

        return [undefined,new CreateToDoDTO(text)];
    }
}