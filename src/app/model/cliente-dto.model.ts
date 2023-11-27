export class ClienteDTO {
    constructor(        
        public sharedKey: string,
        public bussinessId: string,
        public email: string,
        public phone: number,
        public startDate: string,
        public endDate: string,
        public creationDate: string,
        public id?: number,
        ) { }
}
